import { Injectable } from '@nestjs/common';
import { CreateConfigurationInput } from './dto/create-configuration.input';
import { UpdateConfigurationInput } from './dto/update-configuration.input';

@Injectable()
export class ConfigurationsService {
  create(createConfigurationInput: CreateConfigurationInput) {
    return 'This action adds a new configuration';
  }

  findAll() {
    return `This action returns all configurations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configuration`;
  }

  update(id: number, updateConfigurationInput: UpdateConfigurationInput) {
    return `This action updates a #${id} configuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuration`;
  }
}
