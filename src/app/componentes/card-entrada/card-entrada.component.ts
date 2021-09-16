import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-card-entrada',
  templateUrl: './card-entrada.component.html',
  styleUrls: ['./card-entrada.component.scss'],
})
export class CardEntradaComponent implements OnInit {


  @Input() entrada:{
    fecha: string,
    fechaTexto: string,
    texto: string

  };

  @Input() soloLectura: boolean = false;

  @Output() eventoGuardar: EventEmitter<{
    fecha: string,
    fechaTexto: string,
    texto: string

  }> = new EventEmitter<{
    fecha: string,
    fechaTexto: string,
    texto: string

  }>();


  constructor(public toastController: ToastController,) {

  }

  ngOnInit() {}

  guardar(){
    this.eventoGuardar.emit(this.entrada);
  }


}
