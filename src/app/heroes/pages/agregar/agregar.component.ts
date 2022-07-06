import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

import { switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {

    if (this.heroe.superhero.trim().length===0) {
      return;
    }

    if(this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
          this.mostrarSnacbar('Registro actualizado')
        }
        )
    } else {
      // Crear
      this.heroesService.guardarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnacbar('Registro creado')
        })
    }
  }


  borrarHeroe () {

    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
            })
          //console.log(result);
        }

      }
    )

  }


  mostrarSnacbar(mensaje: string){
    this.snackbar.open(mensaje,'ok!', {
      duration: 2500
    })
  }

}
