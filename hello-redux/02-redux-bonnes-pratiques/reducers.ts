import { Action, AppState } from "./types";
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT, FETCH_POKEMONS, FETCH_POKEMONS_SUCCESS, SET_FILTER, FETCH_POKEMONS_ERROR } from "./constants";
import { combineReducers } from "@reduxjs/toolkit";


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

export function counterReducer(state = initialState.counter, action: Action): AppState["counter"] {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload,
      };
      default:
        return state;
    }
  }

  export function pokemonsReducer(state = initialState.pokemons, action: Action): AppState["pokemons"] {  
    switch (action.type) {
      case FETCH_POKEMONS:
        return {
          ...state,
          loading: true,
        };
      case FETCH_POKEMONS_SUCCESS:
        return {
          ...state,
          list: action.payload,
          loading: false,
        };
      case FETCH_POKEMONS_ERROR:
        return {
          ...state,
          loading: false,
        };
      case SET_FILTER:
        return {
          ...state,
          filter: action.payload,
        };
      default:
        return state;
    }
  }

export const reducer = combineReducers({
  counter: counterReducer,
  pokemons: pokemonsReducer,
});
