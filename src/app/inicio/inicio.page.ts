import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InicioService } from './inicio.service'
import * as moment from 'moment';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  alumnos = [];
  dato : any;
  fecha: string;
  tokenUser: any;

  entradas: Array<{
    fecha: string,
    fechaTexto: string,
    texto: string
  }>

  entradaActual: {
    fecha: string,
    fechaTexto: string,
    texto: string
  };

  constructor(public toastController: ToastController,
    private router: Router,
    private activeroute: ActivatedRoute,
    private inicioService: InicioService){

    this.activeroute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation().extras.state) {
        this.dato = this.router.getCurrentNavigation().extras.state.dato;
        this.tokenUser = this.dato;
        localStorage.setItem('tokenUser',this.tokenUser);
      }
    });

    this.tokenUser = localStorage.getItem('tokenUser');

    moment.locale('es-mx');
    this.fecha = moment().format();
    this.cargarEntradas();
  }
  //Desde InicioService
  ngOnInit() {
    this.alumnos = this.inicioService.getAlumnos();
  }

  ionViewWillEnter(){
    this.alumnos = this.inicioService.getAlumnos();
  }

  cargarEntradas(){

    var fecha = moment(this.fecha).format('MM-DD-YY');
    this.entradas = JSON.parse(localStorage.getItem('entradas'));

    if(this.entradas){
      var entradaActual = this.entradas.find((elemento)=>{
        return elemento.fecha == fecha;
      });
      if(entradaActual){
        this.entradaActual = entradaActual;
        this.entradaActual.texto = '';

        //Console.log entradaActual
        //console.log(this.entradaActual);
      }else{
        this.inicializarNuevaEntrada();
      }
    }else{
      this.inicializarNuevaEntrada();
    }
  }

  inicializarNuevaEntrada(){
    var fecha = moment(this.fecha).format('MM-DD-YY');
    var dia = moment(this.fecha).format('DD');
    var mes = moment(this.fecha).format('MMMM');
    var year = moment(this.fecha).format('YYYY');

    this.entradaActual = {
      fechaTexto: dia + ' de ' + mes + ' del ' +  year,
      fecha: fecha,
      texto: ''
    }
  }

  //METODO GUARDANDO DATOS EN LOCAL_STORAGE SET_ITEM
  async guardar(entradaActual: {
    fecha: string,
    fechaTexto: string,
    texto: string
  }){
    var fecha = moment(this.fecha).format('MM-DD-YY');
    console.log(this.entradas);
    if(this.entradas){
      var item = this.entradas.find((elemento)=>{
        return elemento.fecha == fecha;

      });
      if(item){
        localStorage.setItem('entradas',JSON.stringify(this.entradas));
        item.texto = '';
      }else{
        this.guardarItem(entradaActual);
      }
    }else{
      this.entradas = [];
      this.guardarItem(entradaActual);
    }

    const toast = await this.toastController.create({
      message: 'Datos guardados Correctamente',
      duration: 2000
    });
    toast.present();
  }

  guardarItem(entrada:{fecha: string,fechaTexto: string,texto: string}){
    this.entradas.push(entrada);
    localStorage.setItem('entradas',JSON.stringify(this.entradas));
  }

  //LISTA TEMPORAL DE ALUMNOS


}
