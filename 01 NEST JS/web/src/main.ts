import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); //servidor web estático
  app.use(cookieParser('cookie secreta XD')); //secreto cookies
  app.use(
      //session
      session({
        name: 'server-session-id',
        secret: 'Este es el mensaje secreto',
        resave: true,
        saveUnitialized: true,
        cookie: { secure: false },
        store: new FileStore(),
      }),
  );

  await app.listen(3000); //puerto
}
bootstrap();

//Comando para ejecutar el proyecto
  //npm run start


/*
//TYPESCRIPT

//VARIABLES PRIMITIVAS
//TIPOS DE VARIABLES

//MUTABLES (resignar -> = )

var variableUno = 1;    // NO UASMOS VAR !
let variableDos = 2;
variableUno = 3;
variableDosvariableDos = 4;

//INMUTABLES (No se pueden reasignar)
const variableTres = 5;
let objetoUsuario = {
  nombre: 'Andrés',
  apellido: 'García'
}

// PRIMITIVAS PRIMITIVAS

const texto: string = ''; //"" (No existe Char)
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true;
cons noDefinido = undefined;
const noHayNada = null;


//DuckTyping
const textoDos = 'Andres';
let cualquierCosa: any = 'Garcia'
cuaquierCosa = 1;
cualquierCosa = true;
cualquierCosa = newDate();


//Clases

class Usuario{
    constructor(
        public nombre: string,
        public apellido: string
    ){

  }
}

const usuario: Usuario = new Usuario('Andres','Garcia');
usuario.nombre;
usuario.apellido;


//Interfaces
interface UsuarioInterface{
    nombre: string;
    apellido: string;
    edad?: numbre;  // ? => Opcional // Valor por defecto es undefined
}


//PUNTEROS REFERENCIALES

//PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua; //Valor
edadAntigua += 1; //23
otraEdad  -= 1; //21


//Objeto
let objetoEdad = {
  edad: 22
}

let otraEdadObjeto = objetoEdad;  //Se guarda la referencia
otraEdadObjeto.edad= otraEdadObjeto.edad + 1 //23
console.log(otraEdadObjeto.edad)
objetoEdad.edad //23
console.log(otraEdadObjeto.edad)
objetoEdad.edad = objetoEdad.edad + 1 //24
otraEdadObjeto.edad //24

let otraEdadObjetoClonado = {...objetoEdad};  //Clonacion de objetos
const arregloEjemplo = [1,2,3]
let arregloClonado = {...arregloEjemplo}  //Clonación Arreglos


//Arreglos

const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1,2,3,4,5];

function funcionConNombre(){}

const indice = arregloNumeros.findIndex(
    (numero) => {       //Función Anónima porque no tiene nombre
      const elValorEsIgualATres: boolean = numero ===3;
      return elValorEsIgualATres  //Condición  -> boolean
    },
    // function (){ //->Función anónima porque no tiene nombre
    //
    // }
);

arregloNumeros[indice] = 6
//agregar al final
arregloNumeros.push(6)
//agregar al principio
arregloNumeros.unshift(0)

//CONICIONES -> Truty y Falsy
const numeroOrden = 0;

if (numeroOrden){
    console.log('Truty')
}else {
    console.log('Falsy')    //Falsy
}

if (1){
    console.log('Tryty')    //Truty
}else {
    console.log('Falsy')
}

if (-1){
    console.log('Tryty')    //Truty
}else {
    console.log('Falsy')
}

if (""){
    console.log('Truty')
}else {
    console.log('Falsy')
}

if ("a"){
    console.log('Tryty')    //Truty
}else {
    console.log('Falsy')
}

if ({}){
    console.log('Tryty')
}else {
    console.log('Falsy')    //Falsy
}

if ({a:1}){
    console.log('Tryty')    //Truty
}else {
    console.log('Falsy')
}

if ([]){
    console.log('Tryty')
}else {
    console.log('Falsy')    //Falsy
}

if ([1]){
    console.log('Tryty')    //Truty
}else {
    console.log('Falsy')
}

if (null){
    console.log('Tryty')
}else {
    console.log('Falsy')    //False
}

if (undefined){
    console.log('Tryty')
}else {
    console.log('Falsy')    //Falsy
}*/

/*

abstract class Nombre{
    public nombrePropiedad?: string;    //Undefinded
    private apellidoPropiedad: string = 'García';
    protected edad = 1;     //number (Duck Typing)
    static  comun: number = 10;
    propiedadPublica: string;
    constructor(
        propiedadPublicaParametro: string,      //parametro
        public propiedadRapido: string,         //transforma una propiedad
    ) {
        this.propiedadPublica = propiedadPublicaParametro;
        this.propiedadRapido;
    }

    public funcionPublica (parametroString: string): void{
        //no hay return = undefined
    }

    private funcionPrivada(parametroString: string, // ?=Puede ser undefined
                           parametroNumber?: number){   //omitir: void(defecto)
        //No hay return = undefined
    }

    protected funcionPublica():number{
        return 1;
    }

    static funcionEstatica(): string{
        return 'string';
    }


}

*/




