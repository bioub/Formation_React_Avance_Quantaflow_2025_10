import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../models/pokemon';

function PokemonSearch({ pokemons = [], onDelete }: { pokemons: Pokemon[]; onDelete: (id: number) => void }) {
  console.log('PokemonSearch render');
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const term = event.target.value;
    setValue(term);
  }


  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={value}
                onChange={(e) => handleInputChange(e)}
              />
              <button onClick={() => setSearchTerm(value)}>Search</button>
            </div>
            <div className="collection">
              <MemoizedPokemonSearchList pokemons={pokemons} searchTerm={searchTerm} onDelete={onDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PokemonSearchList({ pokemons, searchTerm, onDelete }: { pokemons: Pokemon[]; searchTerm: string; onDelete: (id: number) => void }) {
  console.log('PokemonSearchList render');
  
  return pokemons.filter((pokemon) => pokemon.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((pokemon) => (
    <PokemonSearchCard key={pokemon.id} pokemon={pokemon} onDelete={onDelete} />
  ));
}

const MemoizedPokemonSearchList = memo(PokemonSearchList);

// const MemoizedPokemonSearchList = memo(PokemonSearchList, (prevProps, nextProps) => {
//   return prevProps.pokemons === nextProps.pokemons && prevProps.searchTerm === nextProps.searchTerm;
// });

function PokemonSearchCard({ pokemon, onDelete }: { pokemon: Pokemon; onDelete: (id: number) => void }) {
  console.log('PokemonSearchCard render');

  // simulate 100ms delay
  // const start = Date.now();
  // while (Date.now() - start < 100) { }


  return <><Link
    key={pokemon.id}
    to={`/pokemons/${pokemon.id}`}
    className="collection-item"
  >
    {pokemon.name}
  </Link>
  <button onClick={() => onDelete(pokemon.id ?? 0)}>-</button>
  </>
}

export default PokemonSearch;
