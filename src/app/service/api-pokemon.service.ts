import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Type } from '../model/type-pokemon';
import { Generation } from '../model/generation.model';
import { Description } from '../model/description.model';
import { MoveDetail } from '../model/MoveDetail.model';


@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon'
  private readonly apiUrlId = 'https://pokeapi.co/api/v2/pokemon/'
  private readonly apiUrlType = 'https://pokeapi.co/api/v2/type'
  private readonly apiUrlGeneration = 'https://pokeapi.co/api/v2/generation/'
  private readonly apiUrlDescription = 'https://pokeapi.co/api/v2/pokemon-species/'
  constructor(private readonly http: HttpClient) { }



  getListPokemons(pageIndex: number, limit: number): Observable<Pokemon[]> {
    const result = new BehaviorSubject<Pokemon[]>([]);
    this.http.get<PaginedPokemonList>(`${this.apiUrl}/?offset=${pageIndex * limit}&limit=${limit}`).subscribe({
      next: (paginedPokemonList: PaginedPokemonList) => {
        let listPokemons: Pokemon[] = [];
        paginedPokemonList.results.forEach((pokemonPagined) => {
          this.http.get<Pokemon>(pokemonPagined.url).subscribe({
            next: (pokemon: Pokemon) => {
              listPokemons.push(pokemon);
              listPokemons = listPokemons.sort((a: Pokemon, b: Pokemon) => { return a.id - b.id; })
              result.next(listPokemons);
            },
            error: () => {
              console.error(`Erreur de récupération sur l'endpoint ${pokemonPagined.url}`)
            }
          });
        });
      },
      error: () => {
        console.error(`Erreur de récupération de la page ${pageIndex} des Pokémons (taille de page ${limit})`)
      }
    });
    return result;
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrlId}${id}`);


  }

  getTypeList(): Observable<any> {
    return this.http.get<Type>(this.apiUrlType)
  }

  getGenerationList(): Observable<any> {
    return this.http.get<Generation>(this.apiUrlGeneration)

  }

  getDesc(id: number): Observable<Description> {
    return this.http.get<Description>(`${this.apiUrlDescription}${id}/`)
  }

  getMoveDetails(url: string): Observable<MoveDetail> {
    return this.http.get<MoveDetail>(url);
  }




  getListPokemonsByType(typeFilter: string): BehaviorSubject<Pokemon[]> {
    let filterPageIndex = 0;
    let listPokemonsMatchingGen: Pokemon[] = [];
    const result = new BehaviorSubject<Pokemon[]>([]);
    this.http.get<any>(`https://pokeapi.co/api/v2/type/${typeFilter}`).subscribe({
      next: (type) => {
        console.warn(type)
        type.pokemon.forEach((pokemonMatchingType: { pokemon: { name: string } }) => {
          this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonMatchingType.pokemon.name}`).subscribe({
            next: (pokemon: Pokemon) => {
              listPokemonsMatchingGen.push(pokemon);
              listPokemonsMatchingGen = listPokemonsMatchingGen.sort((a: Pokemon, b: Pokemon) => { return a.id - b.id; })
              result.next(listPokemonsMatchingGen);
            },
            error: () => {
              console.error(`Erreur de récupération sur l'endpoint https://pokeapi.co/api/v2/pokemon/${pokemonMatchingType.pokemon.name}`)
            }
          });
        });
      },
      error: () => {
        console.error(`Erreur de récupération du type spécifié`)
      }
    });
    filterPageIndex++;
    return result;
  }





  getListPokemonsByGeneration(genFilter: string): BehaviorSubject<Pokemon[]> {
    let filterPageIndex = 0;
    let listPokemonsMatchingGen: Pokemon[] = [];
    const result = new BehaviorSubject<Pokemon[]>([]);
    this.http.get<any>(`https://pokeapi.co/api/v2/generation/${genFilter}`).subscribe({
      next: (generation) => {
        generation.pokemon_species.forEach((pokemonMatchingGen: { name: string }) => {
          this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonMatchingGen.name}`).subscribe({
            next: (pokemon: Pokemon) => {
              listPokemonsMatchingGen.push(pokemon);
              listPokemonsMatchingGen = listPokemonsMatchingGen.sort((a: Pokemon, b: Pokemon) => { return a.id - b.id; })
              result.next(listPokemonsMatchingGen);
            },
            error: () => {
              console.error(`Erreur de récupération sur l'endpoint https://pokeapi.co/api/v2/pokemon/${pokemonMatchingGen.name}`)
            }
          });
        });
      },
      error: () => {
        console.error(`Erreur de récupération de la génération spécifiée`)
      }
    });
    filterPageIndex++;
    return result;
  }
}


export interface PaginedPokemonList {
  results: {
    name: string;
    url: string;
  }[];
}
