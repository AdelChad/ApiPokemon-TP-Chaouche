export interface PokemonData {
    id: number;
    name: string;
    type: Array<string>;
    abilities: Array<string>;
    height: number;
    weight: number;
    sprite?: string
}