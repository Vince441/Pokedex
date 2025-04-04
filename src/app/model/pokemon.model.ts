import { Move } from "../model/Move.model";


export interface Pokemon {
    moves: Move[];
    id: number,
    order: number;
    name: string,
    height: number;
    sprites: {
        front_default : string;
        back_default: string;
        other: {
            home:{
                front_default: string;
                front_shiny : string;
            }
            showdown:{
                front_default: string;
            }
        }
    }
    cries: {
        legacy: string;
        latest: string;
    }
    types: {
        slot: number;
        type: {
            name: string;
        }
    }[];
    abilities: {
        ability: {
            name: string;
        }
    }[];
    stats: {
        base_stat : number;
        stat: {
            name : string;
        }
    }[];
    species: {
        name : string;
        url:string;
    }

}