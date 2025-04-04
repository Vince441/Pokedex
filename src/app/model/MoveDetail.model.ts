export interface MoveDetail {
    id: number;
    name: string;
    damage_class: {
        name: string;
    }
    effect_entries : {
        effect : string;
    }[],
    power: number;
    accuracy: number;
    pp: number;
    type: string;
  }