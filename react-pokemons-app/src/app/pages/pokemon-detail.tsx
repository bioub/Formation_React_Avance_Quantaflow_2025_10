import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Pokemon } from '../models/pokemon';
import Loader from '../components/loader';
import { isAuthenticated } from '../services/authentication-service';
import { getPokemon } from '../services/pokemon-service';
import PokemonCardDetail from '../components/pokemon-card-detail';

function PokemonsDetail() {
  const params = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    getPokemon(Number(params.id)).then((pokemon) => setPokemon(pokemon));
  }, [params.id]);

  if (!isAuthenticated) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <PokemonCardDetail pokemon={pokemon} />
            <div className="center">
              <Link to="/" className="btn btn-primary">
                Retour
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
}

export default PokemonsDetail;
