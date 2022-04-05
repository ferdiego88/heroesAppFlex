import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  URL: string = 'http://localhost:3000/heroes'
  constructor(private http: HttpClient) { }

  getHeroes (): Observable<Heroe[]>{
     return this.http.get<Heroe[]>(this.URL);
  }

  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.URL}/${id}`);
  }
}
