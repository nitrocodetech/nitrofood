import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);

  const email = 'admin@example.com';
  const password = '123123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await userRepo.findOneBy({ email });

  if (!existingAdmin) {
    const admin = userRepo.create({
      name: 'Admin', // ✅ Only if this field exists in the entity
      email,
      password: hashedPassword,
      role: UserRole.ADMIN, // ✅ Use the enum directly
    });
    await userRepo.save(admin);
    console.log('✅ Admin user created.');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err);
  dataSource.destroy();
});
