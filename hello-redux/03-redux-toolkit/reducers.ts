import { Action, AppState } from "./types";
import { decrement, fetchPokemons, fetchPokemonsError, fetchPokemonsSuccess, incrementByAmount, setFilter } from "./actions";
import { increment } from "./actions";
import { createReducer } from "@reduxjs/toolkit";


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

// export function counterReducer(state = initialState.counter, action: Action): AppState["counter"] {
//   switch (action.type) {
//     case increment.type:
//       return {
//         ...state,
//         value: state.value + 1,
//       };
//     case decrement.type:
//       return {
//         ...state,
//         value: state.value - 1,
//       };
//     case incrementByAmount.type:
//       return {
//         ...state,
//         value: state.value + action.payload,
//       };
//       default:
//         return state;
//     }
//   }

export const counterReducer = createReducer(initialState.counter, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.value += 1;
    })
    .addCase(decrement, (state) => {
      // Without immer
      // return {
      //   ...state,
      //   value: state.value - 1,
      // };
      
      // With immer
      state.value -= 1;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});

export const pokemonsReducer = createReducer(initialState.pokemons, (builder) => {
  builder
    .addCase(fetchPokemons, (state) => {
      state.loading = true;
    })
    .addCase(fetchPokemonsSuccess, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchPokemonsError, (state) => {
      state.loading = false;
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
});
// export function pokemonsReducer(state = initialState.pokemons, action: Action): AppState["pokemons"] {
//   switch (action.type) {
//     case fetchPokemons.type:
//       return {
//         ...state,
//         loading: true,
//       };
//     case fetchPokemonsSuccess.type:
//       return { 
  //         ...state,
  //         list: action.payload,
  //         loading: false,
  //       };
  //     case fetchPokemonsError.type:
  //       return {
  //         ...state,
  //         loading: false,
  //       };
  //     case setFilter.type:
  //       return {
  //         ...state,
  //         filter: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // }

