import { useState, useEffect } from 'react';
import { Pokemon } from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import { getPokemons } from '../services/pokemon-service';
import { Link, Navigate } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';
import { isAuthenticated } from '../services/authentication-service';
import { useCompare } from '../helpers/compare-context';
import List from '../components/list';
import Loader from '../components/loader';

function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemons()
      .then((pokemons) => {
        setPokemons(pokemons);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return {pokemons, loading, error};
}

function PokemonList() {
  const { pokemons, loading, error } = usePokemons();
  const { pokemonIdsToCompare } = useCompare();
  
  if (!isAuthenticated) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return null;
    // return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          <PokemonSearch />
          <List items={pokemons} renderItem={(pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />} />
        </div>
      </div>
      <Link
        className="btn-floating btn-large waves-effect waves-light red z-depth-3"
        style={{ position: 'fixed', bottom: '25px', right: '25px' }}
        to="/pokemon/add"
      >
        <i className="material-icons">add</i>
      </Link>
      {pokemonIdsToCompare.length === 2 && (
        <Link
          className="btn-floating btn-large waves-effect waves-light teal z-depth-3"
          style={{ position: 'fixed', bottom: '25px', right: '100px' }}
          to="/pokemon/compare"
        >
          <i className="material-icons">compare</i>
        </Link>
      )}
    </div>
  );
}

export default PokemonList;
