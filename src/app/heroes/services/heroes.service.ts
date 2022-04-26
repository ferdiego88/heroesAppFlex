import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes (): Observable<Heroe[]>{
     return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getSugerencias(termino: string):  Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes?q=${termino}&_limit=6`);
  }

  guardarHeroe(heroe: Heroe):  Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseURL}/heroes`,heroe);
  }
}
