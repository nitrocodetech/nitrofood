import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = '123123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch((e: unknown) => {
    if (e instanceof Error) {
      // safe to access `e.message`
      console.error('Error:', e.message);
    } else {
      console.error('Unexpected error:', e);
    }
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.error('Error disconnecting prisma:', e);
    });
  });
