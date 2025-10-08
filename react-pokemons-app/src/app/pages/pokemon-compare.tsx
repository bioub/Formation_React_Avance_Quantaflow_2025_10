import { useEffect, useState } from "react";
import PokemonCardDetail from "../components/pokemon-card-detail";
import { getPokemon } from "../services/pokemon-service";
import { Pokemon } from "../models/pokemon";
import { Link } from "react-router-dom";

function PokemonCompare() {
  const [pokemon1, setPokemon1] = useState<Pokemon | undefined>();
  const [pokemon2, setPokemon2] = useState<Pokemon | undefined>();

  useEffect(() => {
    getPokemon(1).then((pokemon) => setPokemon1(pokemon));
    getPokemon(2).then((pokemon) => setPokemon2(pokemon));
  }, []);

  if (!pokemon1 || !pokemon2) {
    return <div>Loading...</div>;
  }

  return <div>
    <div className="row">
      <div className="col s6">
        <PokemonCardDetail pokemon={pokemon1} />
      </div>
      <div className="col s6">
        <PokemonCardDetail pokemon={pokemon2} />
      </div>
    </div>
    <div className="center">
      <Link to="/" className="btn btn-primary">
        Retour
      </Link>
    </div>
  </div>;
}

export default PokemonCompare;