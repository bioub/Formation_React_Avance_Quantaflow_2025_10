import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import { expect, test, vi } from 'vitest';
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

test('PokemonSearch shows the correct name of pokemons', () => {
  render(
    <MemoryRouter>
      <PokemonSearch
        pokemons={[{ id: 1, name: 'Pikachu' }]}
        onDelete={() => {}}
      />
    </MemoryRouter>
  );

  const el = screen.queryByText('Pikachu');
  expect(el).toBeInTheDocument();
});
test('PokemonSearch filters when typing in the search box with userEvent', async () => {
render(
    <MemoryRouter>
      <PokemonSearch
        pokemons={[{ id: 1, name: 'Pikachu' }, { id: 2, name: 'Bulbasaur' }]}
        onDelete={() => {}}
      />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Rechercher un pokémon');
  await userEvent.type(input, 'B');

  const searchButton = screen.getByText('Search');
  await userEvent.click(searchButton);

  const bulbasaurEl = screen.queryByText('Bulbasaur');
  expect(bulbasaurEl).toBeInTheDocument();

  const pikachuEl = screen.queryByText('Pikachu');
  expect(pikachuEl).not.toBeInTheDocument();
});


test('PokemonSearch calls onDelete when clicking the delete button with correct id', async () => {
  const onDelete = vi.fn();

  render(
    <MemoryRouter>
      <PokemonSearch
        pokemons={[{ id: 1, name: 'Pikachu' }, { id: 2, name: 'Bulbasaur' }]}
        onDelete={onDelete}
      />
    </MemoryRouter>
  );

  const deleteButtons = screen.getByTestId('delete-button-1');
  await userEvent.click(deleteButtons);

  expect(onDelete).toHaveBeenCalledWith(1);
  expect(onDelete).toHaveBeenCalledTimes(1);
});

