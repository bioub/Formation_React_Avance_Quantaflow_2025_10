import { createContext, ReactNode, useContext, useState } from "react";

interface CompareContextType {
  pokemonIdsToCompare: number[];
  togglePokemonId: (id: number) => void;
}

export function useCompare() {
  return useContext(CompareContext);
}

export const CompareContext = createContext<CompareContextType>({
  pokemonIdsToCompare: [],
  togglePokemonId: (_id: number) => {
    throw new Error("CompareProvider is missing");
  },
});

export function CompareProvider({ children }: { children: ReactNode }): ReactNode {
  const [pokemonIdsToCompare, setPokemonIdsToCompare] = useState<number[]>([]);

  const togglePokemonId = (id: number) => {
    setPokemonIdsToCompare((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else if (prevIds.length < 2) {
        return [...prevIds, id];
      } else {
        return prevIds;
      }
    });
  };

  return (
    <CompareContext.Provider value={{ pokemonIdsToCompare, togglePokemonId }}>
      {children}
    </CompareContext.Provider>
  );
}