import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alumno } from '../inicio.model';
import { InicioService } from '../inicio.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumno: Alumno;
  constructor(private activatedRoute: ActivatedRoute,
    private inicioService: InicioService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      const recipeId = paramMap.get('usersId');
      this.alumno = this.inicioService.getAlumno(recipeId.charAt(recipeId.length - 1));
      //console.log(recipeId.charAt(recipeId.length - 1));
      console.log(this.alumno);
    })
  }

  async eliminarEntrada(){
    const alertElement = await this.alertController.create({
      header: 'Estas seguro de eliminar?',
      message: 'Se eliminara Registro',
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () =>{
            this.inicioService.deleteAlumno(this.alumno.id);
            this.router.navigate(['menu/inicio']);
          }
        }
      ]
    });
    await alertElement.present();

  }

}
