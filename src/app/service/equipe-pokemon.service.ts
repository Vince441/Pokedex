import { Injectable } from '@angular/core';
import { ApiPokemonService } from './api-pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class EquipePokemonService {

  constructor(private readonly http: HttpClient, private readonly apiPokemonService: ApiPokemonService) { }

  equipe : Pokemon[] = [];


  addPokemon(pokemon: Pokemon) {
    this.equipe.push(pokemon);
  }

  getEquipe(): Pokemon[] {
    return this.equipe;
  }



}
