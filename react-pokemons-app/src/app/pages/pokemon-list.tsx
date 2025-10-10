import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import { getPokemons } from '../services/pokemon-service';
import { Link, Navigate } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';
import { isAuthenticated } from '../services/authentication-service';
import { useCompare } from '../helpers/compare-context';
import List from '../components/list';
import Loader from '../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonsErrorSelector, pokemonsLoadingSelector, pokemonsSelector } from '../../store/selectors';
import { fetchPokemons,  } from '../../store/slices';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/store';
// import { exportToExcel } from '../helpers/export-to-excel';

// function usePokemons() {
//   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     getPokemons()
//       .then((pokemons) => {
//         setPokemons(pokemons);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return {pokemons, loading, error};
// }

function PokemonList() {
  const pokemons = useAppSelector(pokemonsSelector);
  const loading = useAppSelector(pokemonsLoadingSelector);
  const error = useAppSelector(pokemonsErrorSelector);
  const dispatch = useAppDispatch();

  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);
  // const { pokemons, loading, error } = usePokemons();
  const { pokemonIdsToCompare } = useCompare();

  

  
  // const memoHandleDelete = useMemo(() => function handleDelete(id: number): void {
  //   const index = pokemons.findIndex((pokemon) => pokemon.id === id);
  //   if (index !== -1) {
  //     setPokemons([...pokemons.slice(0, index), ...pokemons.slice(index + 1)]);
  //   }
  // }, [pokemons]);

  const memoHandleDelete = useCallback(function handleDelete(id: number): void {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);
    if (index !== -1) {
      // TODO create delete action
      // setPokemons([...pokemons.slice(0, index), ...pokemons.slice(index + 1)]);
    }
  }, [pokemons]);


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

  function handleExportExcel(pokemons: Pokemon[]) {
    import('../helpers/export-to-excel').then(({ exportToExcel }) => {
      exportToExcel(pokemons)
    })
  }

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          <PokemonSearch pokemons={pokemons} onDelete={memoHandleDelete}   />
          <List items={pokemons} renderItem={(pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />} />
          <button onClick={() => handleExportExcel(pokemons)}>Export Excel</button>
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
