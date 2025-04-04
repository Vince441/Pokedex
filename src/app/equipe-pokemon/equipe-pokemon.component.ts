import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { EquipePokemonService } from '../service/equipe-pokemon.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MoveDetail } from '../model/MoveDetail.model';
import { ItemsPokemonComponent } from "./items-pokemon/items-pokemon.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipe-pokemon',
  imports: [FormsModule, NgIf, ItemsPokemonComponent, RouterLink],
  templateUrl: './equipe-pokemon.component.html',
  styleUrl: './equipe-pokemon.component.scss'
})
export class EquipePokemonComponent implements OnInit {

  constructor(private equipePokemonService: EquipePokemonService, private apiPokemonService: EquipePokemonService) { }


  userName: string = "";
  isModalOpen: boolean = false;
  imgPokeball: string = "assets/images/pokeball2.png"
  movesDetails: MoveDetail[] = [];
  showPokemon: boolean = false;
  showItem: boolean = false;

  epee: string = "assets/images/stats/epee.png";
  bouclier: string = "assets/images/stats/bouclier.png";

  getModal() {
    this.isModalOpen = !this.isModalOpen
  }

  getShowPokemon() {
    this.showPokemon = !this.showPokemon;
    this.showItem = false;
  }

  getShowItem() {
    this.showItem = !this.showItem
    this.showPokemon = true;
  }

  equipe: Pokemon[] = [];



  ngOnInit(): void {
    this.equipe = this.equipePokemonService.getEquipe();


  }



}

