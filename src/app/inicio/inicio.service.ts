import { Injectable } from '@angular/core';
import { Alumno } from './inicio.model';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private alumnos: Alumno[] = [
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
      comentarios: ['Vespertino', 'Sección: MAT2120-001V']
    },
    {
      id: '3',
      user: 'Ayrton Vergara',
      imageURL: '../../assets/user_03.png',
      comentarios: ['Vespertino', 'Sección: MAT1310-001V']
    },
    {
      id: '4',
      user: 'Lorena Araya',
      imageURL: '../../assets/user_04.png',
      comentarios: ['Vespertino', 'Sección: MAT2125-001V']
    },
    {
      id: '5',
      user: 'Marcelo Olguin',
      imageURL: '../../assets/user_05.png',
      comentarios: ['Vespertino', 'Sección: MAT4154-001V']
    },
    {
      id: '6',
      user: 'Fernanda González',
      imageURL: '../../assets/user_06.png',
      comentarios: ['Vespertino', 'Sección: MAT4137-001V']
    },
    {
      id: '7',
      user: 'Profesor: David Reyes',
      imageURL: '../../assets/user_07.png',
      comentarios: []
    }
  ]

  constructor() { }

  getAlumnos(){
    return [...this.alumnos]
  }

  getAlumno(alumnoId: string){
    return {
      ...this.alumnos.find( alumno => {
        return alumno.id === alumnoId
      })
    }
  }

  addAlumno(user: string, imageURL: string){
    this.alumnos.push({
      id: this.alumnos.length + 1 + "",
      user,
      imageURL,
      comentarios: []
    });
  }

  deleteAlumno(alumnoId: string){
    this.alumnos = this.alumnos.filter(alumno =>{
      return alumno.id !== alumnoId
    })
  }

}
