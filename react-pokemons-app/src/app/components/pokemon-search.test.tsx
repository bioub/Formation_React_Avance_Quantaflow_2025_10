import { render } from '@testing-library/react';
import { test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PokemonSearch from './pokemon-search';

test('PokemonSearch component renders with no pokemons', () => {
  render(<PokemonSearch pokemons={[]} onDelete={() => {}} />);
});

test('PokemonSearch component renders with pokemons', () => {
  render(
    <MemoryRouter>
      <PokemonSearch
        pokemons={[{ id: 1, name: 'Pikachu' }]}
        onDelete={() => {}}
      />
    </MemoryRouter>
  );
});

test('PokemonSearch shows the correct name of pokemons', () => {});
test('PokemonSearch filters when typing in the search box with userEvent', () => {});
test('PokemonSearch calls onDelete when clicking the delete button with correct id', () => {});