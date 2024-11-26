import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './util/api-response.type';
import { PokemonCard } from './util/pokemon-card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService implements OnInit {

  defaultPokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon/4/';
  pokemonUrl: string = `https://pokeapi.co/api/v2/pokemon/`;
  mockBackendUrl: string = 'http://localhost:3000/api/cards';
  defaultPokemonImg = '../assets/images/defaultCard.jpg'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('Card Service started!');
    console.log(this.http.get(this.defaultPokemonUrl));
  }

  getCards(): Observable<any> {
    return this.http.get(this.pokemonUrl);
  }

  fetchPokemonTest(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.pokemonUrl);
  }

  transformPokemonData(response: ApiResponse): PokemonCard {
    return {
      name: response.name || 'Unknown Pokemon',
      frontImage: response.sprites?.front_default || this.defaultPokemonImg,
      weight: response.weight || 0,
      types: response.types?.map((t: any) => t.type.name) || []
    };
  }

  getDefaultPokemonCard(): Observable<PokemonCard> {
    return this.http.get<ApiResponse>(this.defaultPokemonUrl)
      .pipe(map(response => this.transformPokemonData(response)));
  }

  getPokemonCard(query: string): Observable<PokemonCard> {
    return this.http.get<ApiResponse>(this.pokemonUrl + query)
      .pipe(map(response => this.transformPokemonData(response)));
  }
}
