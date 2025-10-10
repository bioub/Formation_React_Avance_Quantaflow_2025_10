import { legacy_createStore as createStore } from 'redux';

export type pokemonTypes =
  | 'Feu'
  | 'Eau'
  | 'Plante'
  | 'Insecte'
  | 'Normal'
  | 'Vol'
  | 'Poison'
  | 'Fée'
  | 'Psy'
  | 'Electrik'
  | 'Combat';

export interface Pokemon {
  id?: number;
  hp?: number;
  cp?: number;
  name?: string;
  picture?: string;
  types?: pokemonTypes[];
  created?: Date;
}

export interface Action {
  type: string;
  [key: string]: any;
}

export interface CounterState {
  value: number;
}

export interface PokemonsState {
  list: Pokemon[];
  loading: boolean;
  error: string;
  filter: string;
}