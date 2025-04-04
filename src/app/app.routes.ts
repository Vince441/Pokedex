import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./accueil/accueil.component').then((mod) => mod.AccueilComponent),
        title: "Accueil"
    },
    {
        path: 'pokedex',
        loadComponent: () => import('./pokedex/pokedex.component').then((mod) => mod.PokedexComponent),
        title: "Pokedex"
    }, {
        path: 'pokedex/:id',
        loadComponent: () => import('./detail-pokemon/detail-pokemon.component').then((mod) => mod.DetailPokemonComponent),
        title: "Details"
    }, {
        path: 'equipepokemon',
        loadComponent: () => import('./equipe-pokemon/equipe-pokemon.component').then((mod) => mod.EquipePokemonComponent),
        title: "Details"
    }
];
