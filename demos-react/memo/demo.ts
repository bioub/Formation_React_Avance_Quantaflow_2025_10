import { memoize } from 'lodash-es';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

let fakePokemons = Array.from({ length: 10_000_000 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon ${i + 1}`,
  type: ['Fire', 'Water', 'Grass', 'Electric'][i % 4],
}));

function getWaterPokemons(pokemons: Pokemon[]) {
  return pokemons.filter((pokemon) => pokemon.type === 'Water');
}

const memoizedGetWaterPokemons = memoize(getWaterPokemons);

console.time('getWaterPokemons');
console.log(memoizedGetWaterPokemons(fakePokemons).length); // ~ 250
console.timeEnd('getWaterPokemons');


console.time('getWaterPokemons');
console.log(memoizedGetWaterPokemons(fakePokemons).length); // ~ 250
console.timeEnd('getWaterPokemons');

// Mutate the array
// fakePokemons.push({ id: 10_000_001, name: 'New Pokemon', type: 'Water' });

// Immutable update
fakePokemons = [...fakePokemons, { id: 10_000_001, name: 'New Pokemon', type: 'Water' }];

console.time('getWaterPokemons after mutation');
console.log(memoizedGetWaterPokemons(fakePokemons).length); // Still ~ 250 due to memoization
console.timeEnd('getWaterPokemons after mutation');