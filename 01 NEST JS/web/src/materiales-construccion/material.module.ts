import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    MaterialService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    MaterialService,
  ],
  controllers: [
    // declaramos controladores
    MaterialController,
  ],
})
export class MaterialModule {}
