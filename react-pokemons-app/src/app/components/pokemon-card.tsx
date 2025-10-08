import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/pokemon';
import './pokemon-card.css';
import { formatDate, formatType } from '../helpers';
import { useContext } from 'react';
import { CompareContext, useCompare } from '../helpers/compare-context';

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();
  const { pokemonIdsToCompare, togglePokemonId } = useCompare();

  function goToPokemon(id: number) {
    navigate(`/pokemons/${id}`);
  }

  return (
    <div className="col s6 m4">
      <div className="card horizontal">
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
            </p>
            {pokemon.types?.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
          </div>       
          <label>
            <input type="checkbox"
              checked={pokemonIdsToCompare.includes(pokemon.id ?? 0)}
              onChange={() => togglePokemonId(pokemon.id ?? 0)} />
            <span>Comparer</span>
          </label>
          <button onClick={() => goToPokemon(pokemon.id ?? 0)}>Details</button>

        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
