import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  mostrarMensaje = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
      this.heroesService.getSugerencias(this.termino.trim())
        .subscribe(heroes => {
          if(this.termino.trim().length > 1) {
            if (this.heroes.length === 0) {
              this.mostrarMensaje = true;
            } else {
            this.mostrarMensaje = false;
            } 
          } else {
            this.mostrarMensaje = false;
          }
        this.heroes = heroes;
        });
      }

  // opcionSeleccionada(evento: MatAutocompleteSelectedEvent ) {
  //  const heroe: Heroe = evento.option.value;
  //   this.termino = heroe.superhero;
  //    this.heroeSeleccionado
  //   this.heroesService.getHeroePorId(heroe.id!)
  //     .subscribe(heroe => this.heroeSeleccionado = heroe);
  // }

}
