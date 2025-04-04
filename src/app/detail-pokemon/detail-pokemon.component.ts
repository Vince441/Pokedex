import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPokemonService } from '../service/api-pokemon.service';
import { Pokemon } from '../model/pokemon.model';
import { NgClass, NgStyle } from '@angular/common';
import { Move } from '../model/Move.model';
import { MoveDetail } from '../model/MoveDetail.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EquipePokemonService } from '../service/equipe-pokemon.service';


@Component({
  selector: 'app-detail-pokemon',
  imports: [NgStyle, NgClass, MatSlideToggleModule],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss'
})
export class DetailPokemonComponent {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiPokemonService: ApiPokemonService,
    private readonly equipePokemonService: EquipePokemonService) { }


  listPokemon: Pokemon[] = [];
  private id: number = 0;
  description!: string;
  movesDetails: MoveDetail[] = [];
  isMoveDisable: boolean = false;
  estClick = false;
  downGif = false;
  normalIsVisible = true;
  shinyIsVisible = false;
  imageRondoudou: string = "assets/images/39.gif"
  imagePlus: string = "assets/images/imgPlus.png"

  pokemon!: Pokemon;
  equipe: Pokemon[] = [];



  isVisibleImg() {
    this.normalIsVisible = !this.normalIsVisible
    this.shinyIsVisible = !this.shinyIsVisible
  }

  @ViewChild('upToup') upToup!: ElementRef;

  scrollToElement() {
    this.upToup.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.downGif = !this.downGif;
  }

  getMoveDisable() {
    this.isMoveDisable = !this.isMoveDisable
    this.estClick = !this.estClick;
  }

  typeColor: { [color: string]: string } = {
    grass: 'green',
    fire: '#a93226',
    water: '#00008B',
    electric: '#FFD700',
    rock: 'gray',
    fairy: 'pink',
    bug: 'lightgreen',
    poison: 'purple',
    ghost: '#462c54',
    dragon: '#4169E1',
    psychic: '#FF69B4',
    ice: 'lightblue',
    fighting: 'orange',
    normal: 'gray',
    steel: 'silver',
    dark: 'black',
    flying: 'gray',
    ground: 'brown'
  };

  getColorForType(type: string): string {
    return this.typeColor[type];
  }


  addPokemon(pokemon: Pokemon) {
    this.equipePokemonService.addPokemon(pokemon);
   
  }


  getMovesDetails(moves: Move[]): void {
    moves.forEach(move => {
      this.apiPokemonService.getMoveDetails(move.move.url).subscribe(move => {
        this.movesDetails.push(move);
      });
    });
  }



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.apiPokemonService.getPokemonById(this.id).subscribe({
      next: (pokemon: Pokemon) => {
        this.listPokemon = [pokemon];
        this.getMovesDetails(pokemon.moves);
      },
      error: (err: any) => {
        console.error('Impossible de récupérer les données du Pokémon', err);
      }
    });
    this.apiPokemonService.getDesc(this.id).subscribe((species) => {
      const flavorTextEntry = species.flavor_text_entries[0];
      if (flavorTextEntry) {
        this.description = flavorTextEntry.flavor_text
          .replace(/\f/g, '')
      } else {
        this.description = 'Description not available.';
      }
    });
  }
}


