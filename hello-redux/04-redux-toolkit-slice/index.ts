import { configureStore } from '@reduxjs/toolkit';
import { AppState } from './types';
import { addPokemon, counterReducer, pokemonsReducer } from './slices';
import {
  decrement,
  fetchPokemons,
  fetchPokemonsError,
  fetchPokemonsSuccess,
  increment,
  incrementByAmount,
  setFilter,
} from './slices';
import {
  counterValueSelector,
  filteredPokemonsSelector,
  pokemonsSelector,
} from './selectors';

const store = configureStore<AppState>({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
  },
});

store.subscribe(() => {
  console.log('Pokemons', pokemonsSelector(store.getState()));
  console.log('Counter', counterValueSelector(store.getState()));
  console.log('Filtered pokemons', filteredPokemonsSelector(store.getState()));
});

console.log('Initial state', store.getState());

// Dispatching actions
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementByAmount(5));
store.dispatch(fetchPokemons());
store.dispatch(
  fetchPokemonsSuccess([
    {
      id: 1,
      name: 'Bulbizarre',
      types: ['Plante', 'Poison'],
      hp: 45,
      cp: 49,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      created: new Date(),
    },
    {
      id: 4,
      name: 'Salamèche',
      types: ['Feu'],
      hp: 39,
      cp: 52,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
      created: new Date(),
    },
    {
      id: 7,
      name: 'Carapuce',
      types: ['Eau'],
      hp: 44,
      cp: 48,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
      created: new Date(),
    },
  ]),
);
store.dispatch(setFilter('Sala'));


store.dispatch(addPokemon({
  name: 'Pikachu',
  types: ['Electrik'],
  hp: 35,
  cp: 55,
  picture:
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png',
}));