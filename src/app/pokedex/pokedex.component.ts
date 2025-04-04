import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { ApiPokemonService, PaginedPokemonList } from '../service/api-pokemon.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Type } from '../model/type-pokemon';
import { Generation } from '../model/generation.model';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';


import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-pokedex',
  imports: [RouterLink, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent implements OnInit {
  private id: number = 0;
  typeList: Type[] = [];
  typeGen: Generation[] = [];
  listPokemon: Pokemon[] = [];

  totalPokemons: number = 0; 
  pageSize: number = 0; 
  pageIndex: number = 0;



  constructor(private readonly http: HttpClient, private readonly apiPokemonService: ApiPokemonService) { }




  loadPokemons(pageIndex: number, pageSize: number): void {
    this.apiPokemonService.getListPokemons(pageIndex, pageSize).subscribe({
      next: (pokemons) => {
        this.listPokemon = pokemons;
        this.totalPokemons = 1302;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des Pokémons:', err);
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPokemons(this.pageIndex, this.pageSize);
  }


  getPokemonByType(event: any): void {
    this.apiPokemonService.getListPokemonsByType(event.target.value).subscribe
      ({
        next: (value) => {
          this.listPokemon = value;

        }, error: (err: string) => {
          console.error('Impossible de récuperer les données' + err)
        }
      })
  }

  getPokemonByGen(event: any): void {
    console.log(event)
    this.apiPokemonService.getListPokemonsByGeneration(event.target.value).subscribe
      ({
        next: (value) => {
          this.listPokemon = value;
          console.log(value)
        }, error: (err: string) => {
          console.error('Impossible de récuperer les données' + err)
        }
      })
  }



  ngOnInit(): void {


    this.loadPokemons(this.pageIndex, this.pageSize);


    this.apiPokemonService.getTypeList().subscribe({
      next: (value) => {
        this.typeList = value.results;

      }, error: (err: string) => {
        console.error('Impossible de récuperer les données' + err)
      }
    });

    this.apiPokemonService.getGenerationList().subscribe({
      next: (value) => {
        this.typeGen = value.results;

      }, error: (err: string) => {
        console.error('Impossible de récuperer les données' + err)
      }
    });
   
  }




}
