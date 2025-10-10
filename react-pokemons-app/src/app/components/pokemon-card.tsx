import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/pokemon';
import './pokemon-card.css';
import { formatDate, formatType } from '../helpers';
import { useCompare } from '../helpers/compare-context';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectedPokemonIdsSelector } from '../../store/selectors';
import { togglePokemonSelection } from '../../store/slices';

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();
  const pokemonsIdsToCompare = useAppSelector(selectedPokemonIdsSelector);
  const dispatch = useAppDispatch();
  // const { pokemonIdsToCompare, togglePokemonId } = useCompare();

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
              checked={pokemonsIdsToCompare.includes(pokemon.id ?? 0)}
              onChange={() => dispatch(togglePokemonSelection(pokemon.id ?? 0))} />
            <span>Comparer</span>
          </label>
          <button onClick={() => goToPokemon(pokemon.id ?? 0)}>Details</button>

        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
