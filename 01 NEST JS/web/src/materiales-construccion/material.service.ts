import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}
  buscarUno(id: number) {
    return this.prisma.materialConstruccion.findUnique({ where: { id: id } });
  }
  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { marca: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.materialConstruccion.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }
  crearUno(material: Prisma.MaterialConstruccionCreateInput) {
    return this.prisma.materialConstruccion.create({ data: material });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.MaterialConstruccionUpdateInput;
  }) {
    return this.prisma.materialConstruccion.update({
      data: parametrosActualizar.data,
      where: {
        id: +parametrosActualizar.id,
      },
    });
  }
  eliminarUno(id: number) {
    return this.prisma.materialConstruccion.delete({
      where: { id: id },
    });
  }
}
