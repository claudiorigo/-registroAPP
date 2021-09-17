import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  dato : any;
  fecha: string;

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
    public router: Router,
    public activeroute: ActivatedRoute
    ){

      this.activeroute.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation().extras.state) {
          this.dato = this.router.getCurrentNavigation().extras.state.dato;
        }
      });


    moment.locale('es-mx');
    this.fecha = moment().format();
    this.cargarEntradas();
  }

  ngOnInit() {
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

    if(this.entradas){
      var item = this.entradas.find((elemento)=>{
        return elemento.fecha == fecha;
      });
      if(item){
        localStorage.setItem('entradas',JSON.stringify(this.entradas));
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
  private users = [
    {
      id: '1',
      user: 'Claudio Rigollet',
      imageURL: '../../assets/user_01.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    },
    {
      id: '2',
      user: 'Maria Pérez',
      imageURL: '../../assets/user_02.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    },
    {
      id: '3',
      user: 'Ayrton Vergara',
      imageURL: '../../assets/user_03.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    },
    {
      id: '4',
      user: 'Lorena Araya',
      imageURL: '../../assets/user_04.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    },
    {
      id: '5',
      user: 'Marcelo Olguin',
      imageURL: '../../assets/user_05.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    },
    {
      id: '6',
      user: 'Fernanda Gonzalez',
      imageURL: '../../assets/user_06.png',
      comentarios: ['Vespertino', 'Sección: MAT4140-001V']
    }
  ]

}
