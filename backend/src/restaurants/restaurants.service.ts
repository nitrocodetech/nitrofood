import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Restaurant, DeliveryZoneType } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { GeoJsonObject } from 'geojson';

interface CheckInsideZoneResult {
  inside: boolean;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    private readonly dataSource: DataSource,
  ) {}

  private async getDeliveryZoneGeom(
    type: DeliveryZoneType,
    location: { coordinates: [number, number] },
    deliveryZoneRadius: number | null = null,
    deliveryZone?: { coordinates?: number[][][] },
  ): Promise<object> {
    if (type === DeliveryZoneType.CIRCLE) {
      if (!deliveryZoneRadius)
        throw new Error('Radius is required for circular delivery zone');

      const [lng, lat] = location.coordinates;

      const result = await this.dataSource.query<{ geom: GeoJsonObject }[]>(
        `SELECT ST_AsGeoJSON(
      ST_Buffer(
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )::geometry
    )::json AS geom`,
        [lng, lat, deliveryZoneRadius],
      );
      return result[0].geom;
    }

    if (type === DeliveryZoneType.POLYGON) {
      if (!deliveryZone?.coordinates)
        throw new Error('Coordinates are required for polygon delivery zone');
      return { type: 'Polygon', coordinates: deliveryZone.coordinates };
    }

    throw new Error('Invalid delivery zone type');
  }

  private async checkInsideZone(zoneId: string, geom: object): Promise<void> {
    const result = await this.dataSource.query<CheckInsideZoneResult[]>(
      `SELECT ST_Within(
          ST_SetSRID(ST_GeomFromGeoJSON($1), 4326),
          zone.location
        ) AS inside
       FROM zone WHERE zone.id = $2`,
      [JSON.stringify(geom), zoneId],
    );

    if (!result?.[0]?.inside) {
      throw new Error(
        'Location or delivery zone is not inside the selected zone',
      );
    }
  }

  async create(input: CreateRestaurantInput) {
    const {
      location,
      deliveryZoneType,
      deliveryZoneRadius,
      deliveryZone,
      zoneId,
      ...rest
    } = input;

    const geom = await this.getDeliveryZoneGeom(
      deliveryZoneType,
      location,
      deliveryZoneRadius,
      deliveryZone,
    );

    // Ensure both location and delivery zone are inside the selected zone
    await this.checkInsideZone(zoneId, {
      type: 'Point',
      coordinates: location.coordinates,
    });
    await this.checkInsideZone(zoneId, geom);

    const restaurant = this.restaurantRepo.create({
      ...rest,
      location: { type: 'Point', coordinates: location.coordinates },
      deliveryZoneType,
      deliveryZoneRadius: deliveryZoneRadius ?? null,
      deliveryZone: geom,
      zoneId,
    });

    return this.restaurantRepo.save(restaurant);
  }

  findAll() {
    return this.restaurantRepo.find({ relations: ['zone'] });
  }

  findOne(id: string) {
    return this.restaurantRepo.findOne({ where: { id }, relations: ['zone'] });
  }

  async update(id: string, input: UpdateRestaurantInput & { zoneId?: string }) {
    const {
      location,
      deliveryZoneType,
      deliveryZoneRadius,
      deliveryZone,
      zoneId,
      ...rest
    } = input;

    let geom: object | undefined;

    if (deliveryZoneType && location && deliveryZone) {
      geom = await this.getDeliveryZoneGeom(
        deliveryZoneType,
        location,
        deliveryZoneRadius,
        deliveryZone,
      );
    }

    if (zoneId) {
      if (location)
        await this.checkInsideZone(zoneId, {
          type: 'Point',
          coordinates: location.coordinates,
        });
      if (geom) await this.checkInsideZone(zoneId, geom);
    }

    const restaurant = this.restaurantRepo.create({
      ...rest,
      id,
      deliveryZoneType,
      ...(deliveryZoneRadius !== undefined ? { deliveryZoneRadius } : {}),
      deliveryZone: geom,
      location: location
        ? { type: 'Point', coordinates: location.coordinates }
        : undefined,
      zoneId,
    });

    return this.restaurantRepo.save(restaurant);
  }

  remove(id: string) {
    return this.restaurantRepo.delete(id);
  }
}
