import { Module } from '@nestjs/common';
import { PrismaService } from './database.service';

// @Golbal()
@Module({
  providers: [PrismaService],
  /* 
    this is necessary as export will enable access else if you import 
    it will show error. We can't use it or either we can use @Golbal decorator as
    shown above and can import in global module.
  */
  exports: [PrismaService],
})
export class DatabaseModule {}
