import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Pokemon } from './types';

const initialState: AppState = {
  counter: {
    value: 0,
  },
  pokemons: {
    list: [],
    loading: false,
    filter: '',
  },
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState.counter,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

export const addPokemon = createAction(
  'pokemons/addPokemon',
  (pokemon: Omit<Pokemon, 'id' | 'created'>) => {
    return {
      payload: {
        ...pokemon,
        created: new Date(),
      },
    };
  },
);

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: initialState.pokemons,
  reducers: {
    fetchPokemons(state) {
      state.loading = true;
    },
    fetchPokemonsSuccess(state, action: PayloadAction<Pokemon[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPokemonsError(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPokemon, (state, action) => {
      const newPokemon: Pokemon = {
        id: (state.list.at(-1)?.id! ?? 0) + 1,
        ...action.payload,
      };
      state.list.push(newPokemon);
    });
  },
});

export const {
  fetchPokemons,
  fetchPokemonsSuccess,
  fetchPokemonsError,
  setFilter,
} = pokemonsSlice.actions;
export const pokemonsReducer = pokemonsSlice.reducer;
