import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics
  }

  publishers = [
    {id: 'DC Comics',
     desc: 'DC - COMICS'
    },
     {id: 'Marvel Comics',
     desc: 'MARVEL - COMICS'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    if (this.heroe.superhero.trim().length===0) {
      return;
    }
    console.log(this.heroe);
  }

}
