import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialCrearDto } from './dto/material-crear.dto';
import { validate } from 'class-validator';
import { MaterialEditarDto } from './dto/material-editar.dto';

// hpttp://localhost:3000/usuario/
@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() qqueryParams) {
    response.render('material/crear-material', {
      datos: {
        mensaje: qqueryParams.mensaje,
      },
    });
  }

  @Post('crear-material-formulario')
  async crearUsuario(@Res() response, @Body() bodyParams) {
    try {
      const materialRes = await this.materialService.crearUno({
        nombre: bodyParams.nombre,
        marca: bodyParams.marca,
        precio: +bodyParams.precio,
        tipo: bodyParams.tipo,
        stock: !!bodyParams.stock,
      });
      //response.send(userRes); -> ENVIA LA BASE LOS DATOS PERO DEVUELVE JSON
      response.redirect(
        '/material/vista-crear' +
          '?mensaje=Se creo el registro: ' +
          bodyParams.nombre,
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('lista-material')
  async listaMateriales(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un DTO (TODO)
      //   const materialCrearDTO = new MaterialCrearDto();
      //   materialCrearDTO.sk
      const respuesta = await this.materialService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('material/lista-material', {
        datos: {
          material: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Post('eliminar-material/:idMaterial')
  async elminarMaterial(@Res() response, @Param() routeParams) {
    try {
      await this.materialService.eliminarUno(+routeParams.idMaterial);
      response.redirect(
        '/material/lista-material' + '?mensaje=Se elimino el registro',
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('vista-editar/:idMaterial')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const materialEditar = await this.materialService.buscarUno(
        +parametrosRuta.idMaterial,
      );
      response.render('material/editar-material', {
        datos: {
          material: materialEditar,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Editar');
    }
  }

  @Post('editar-material-formulario/:idMaterial')
  async actualizarMaterial(
    @Res() response,
    @Body() bodyParams,
    @Param() parametrosRuta,
  ) {
    const materialEditarDto = new MaterialEditarDto();
    materialEditarDto.nombre = bodyParams.nombre;
    materialEditarDto.marca = bodyParams.marca;
    materialEditarDto.precio = parseFloat(bodyParams.precio);
    materialEditarDto.tipo = bodyParams.tipo;
    materialEditarDto.stock = !!bodyParams.stock;
    console.log(materialEditarDto);
    console.log(parametrosRuta.idMaterial);
    console.log(bodyParams.idMaterial);
    try {
      const errores = await validate(materialEditarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        return response.redirect(
          '/material/lista-material/' + '?mensaje=Error validando datos',
        );
      } else {
        await this.materialService.actualizarUno({
          id: +parametrosRuta.idMaterial,
          data: materialEditarDto,
        });
        response.redirect(
          '/material/vista-crear' +
            '?mensaje=Se editó el registro: ' +
            bodyParams.nombre,
        );
        console.log(parametrosRuta.idMaterial);
        console.log(bodyParams.idMaterial);
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get(':idMaterial')
  obtenerUno(@Param() parametroRuta) {
    return this.materialService.buscarUno(+parametroRuta.idMaterial);
  }

  @Post(':idMaterial')
  async crearUno(@Body() parametrosCuerpo) {
    const materialCrearDTO = new MaterialCrearDto();
    materialCrearDTO.nombre = parametrosCuerpo.nombre;
    materialCrearDTO.marca = parametrosCuerpo.marca;
    materialCrearDTO.precio = parseFloat(parametrosCuerpo.precio);
    materialCrearDTO.tipo = parametrosCuerpo.tipo;
    console.log(parametrosCuerpo.stock.checked);
    if (parametrosCuerpo.stock == 'on') {
      materialCrearDTO.stock = true;
    } else {
      materialCrearDTO.stock = false;
    }
    //materialCrearDTO.stock = !!(parametrosCuerpo.stock);
    materialCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const error = await validate(materialCrearDTO);
      if (error.length > 0) {
        console.log(JSON.stringify(error));
        throw new BadRequestException('no envia bien parametros');
      } else {
        return this.materialService.crearUno(materialCrearDTO);
      }
    } catch (error) {
      console.error({
        error: error,
        mensaje: 'Errores en crear el material de construcción',
      });
      throw new InternalServerErrorException('error servidor');
    }
  }

  @Put(':idMaterial')
  actualizarUno(@Param() parametroRuta) {
    //se utiliza los parametros de cuerpo y de ruta
    return this.materialService.actualizarUno(parametroRuta.idMaterial);
  }

  @Delete(':idMaterial')
  borrarUno(@Param() parametroRuta) {
    //se utiliza los parametros de ruta
    return this.materialService.eliminarUno(parametroRuta.idMaterial);
  }
}
