import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


//Decorador
@Module({
  imports: [//Arreglo de módulos importados

  ],
  controllers: [  //Controladores de este módulo
      AppController
  ],
  providers: [  //Servicios de este módulo
      AppService
  ],
  exports:[ //Servicios EXPORTADOS(que se pueden usar fuera de este modulo)
     AppService
  ],
})
export class AppModule {}
