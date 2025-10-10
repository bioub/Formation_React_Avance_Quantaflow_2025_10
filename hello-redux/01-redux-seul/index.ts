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

interface Action {
  type: string;
  [key: string]: any;
}

interface CounterState {
  value: number;
}

interface PokemonsState {
  list: Pokemon[];
  loading: boolean;
  filter: string;
}

interface AppState {
  counter: CounterState;
  pokemons: PokemonsState;
}

const initialState: AppState = {
  counter: {
    value: 0,
  },
  pokemons: {
    list: [],
    loading: false,
    filter: '',
  }
};

// Reducer (Pure function)
// (state, action) => newState

function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1,
        },
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1,
        },
      };
    case 'INCREMENT_BY_AMOUNT':
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + action.amount,
        },
      };
    case 'FETCH_POKEMONS':
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          loading: true,
        },
      };
    case 'FETCH_POKEMONS_SUCCESS':
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          list: action.pokemons,
          loading: false,
        },
      };
    case 'FETCH_POKEMONS_ERROR':
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          loading: false,
        },
      };
    case 'SET_FILTER':
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          filter: action.filter,
        },
      };
    default:
      return state;
  }
}

const store = createStore<AppState, Action>(reducer);


store.subscribe(() => {
  console.log('Pokemons', store.getState().pokemons.list);
  console.log('Counter', store.getState().counter.value);
});

console.log('Initial state', store.getState());

// Dispatching actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'INCREMENT_BY_AMOUNT', amount: 5 });
store.dispatch({ type: 'FETCH_POKEMONS' });
store.dispatch({
  type: 'FETCH_POKEMONS_SUCCESS',
  pokemons: [
    { id: 1, name: 'Bulbizarre', types: ['Plante', 'Poison'], hp: 45, cp: 49, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png', created: new Date() },
    { id: 4, name: 'Salamèche', types: ['Feu'], hp: 39, cp: 52, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png', created: new Date() },
    { id: 7, name: 'Carapuce', types: ['Eau'], hp: 44, cp: 48, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png', created: new Date() },
  ],
});
store.dispatch({ type: 'SET_FILTER', filter: 'Pi' });
