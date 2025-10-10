import {
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Pokemon } from './types';
import { getPokemons } from '../app/services/pokemon-service';
import { createAppAsyncThunk } from './async-thunk';

const initialState = {
  counter: {
    value: 0,
  },
  pokemons: {
    list: [] as Pokemon[],
    loading: false,
    error: '',
    filter: '',
    selectedPokemonIds: [] as number[],
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
  }
);

export const fetchPokemons = createAppAsyncThunk(
  'pokemons/fetchPokemons',
  async () => {
    return await getPokemons();
  }
);

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: initialState.pokemons,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    togglePokemonSelection(state, action: PayloadAction<number>) {
      const id = action.payload;
      const prevIds = state.selectedPokemonIds;

      if (prevIds.includes(id)) {
        state.selectedPokemonIds = prevIds.filter((prevId) => prevId !== id);
      } else if (prevIds.length < 2) {
        state.selectedPokemonIds.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPokemon, (state, action) => {
      const newPokemon: Pokemon = {
        id: (state.list.at(-1)?.id! ?? 0) + 1,
        ...action.payload,
      };
      state.list.push(newPokemon);
    })
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemons';
      }); 
  },
});



export const {
  // fetchPokemons,
  // fetchPokemonsSuccess,
  // fetchPokemonsError,
  togglePokemonSelection,
  setFilter,
} = pokemonsSlice.actions;
export const pokemonsReducer = pokemonsSlice.reducer;