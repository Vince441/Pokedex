import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-items-pokemon',
  imports: [],
  templateUrl: './items-pokemon.component.html',
  styleUrl: './items-pokemon.component.scss'
})
export class ItemsPokemonComponent {

  isConsommable: boolean = false;
  isPierre: boolean = false;
  isVente: boolean = false;

  potion: string = "assets/images/objet/consommables/potion.png";
  superPotion: string = "assets/images/objet/consommables/super.png";
  hyperPotion: string = "assets/images/objet/consommables/hyper.png";
  bonbon: string = "assets/images/objet/consommables/bonbon.png";

  eau: string = "assets/images/objet/pierre/eau.png";
  feu: string = "assets/images/objet/pierre/feu.png";
  foudre: string = "assets/images/objet/pierre/foudre.png";
  plante: string = "assets/images/objet/pierre/plante.png";

  champi: string = "assets/images/objet/vente/champi.png";
  pepite: string = "assets/images/objet/vente/pepite.png";
  perle: string = "assets/images/objet/vente/perle.png";

  showConsommables() {

    this.isConsommable = !this.isConsommable;
    this.isPierre = false;
    this.isVente = false;
  }

  showPierre() {

    this.isPierre = !this.isPierre;
    this.isConsommable = false;
    this.isVente = false;
  }

  showVente() {

    this.isVente = !this.isVente;
    this.isPierre = false;
    this.isConsommable = false;
  }



}
