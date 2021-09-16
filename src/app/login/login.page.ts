import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dato: string = "";
  nombre: string;
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    public router: Router
    ) {

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar(){

    var f = this.formularioLogin.value;
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    this.dato = usuario.nombre;
    if(usuario.nombre == f.nombre && usuario.password == f.password){

      localStorage.setItem('ingresado','true');
      //this.navCtrl.navigateRoot('menu/inicio');
      let navigationExtras: NavigationExtras = {
        state: {dato: this.dato}
      };
      this.router.navigate(['menu/inicio'],navigationExtras);

    }else{
      const alert = await this.alertController.create({
        header: 'Datos Incorretos',
        message: 'Usuario o Password incorrecta',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

}
