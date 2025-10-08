# Exercices

Formation initiation originale : https://www.youtube.com/watch?v=oCINeytlyRA

Récupérer le projet https://gitlab.com/react-avance/react-pokemons-app

Installer les dépendances avec `npm install` ou `yarn install`

Lancer le serveur de dev avec `npm run start` ou `yarn start`

Lancer l'API REST avec `npm run start:api` ou `yarn start:api`

# Exercice 1 : Rappels

Créer un nouveau composant `src/app/components/pokemon-card-details.tsx` dont le JSX reprend les lignes 26 à 84
de `src/app/pages/pokemon-detail.tsx`

Ce nouveau composant reçoit l'objet pokemon en props, le typer en TypeScript.

Remplacer ensuite les lignes 26 à 84 de `src/app/pages/pokemon-detail.tsx` par ce nouveau composant

Créer une nouvelle page `src/app/pages/pokemon-compare.tsx` contenant le JSX suivant :

```jsx
<div className="row">
  <div className="col s6">
    <PokemonCardDetails pokemon={pokemon1} />
  </div>
  <div className="col s6">
    <PokemonCardDetails pokemon={pokemon2} />
  </div>
</div>
```

Les variables `pokemon1` et `pokemon2` doivent contenir les pokemon dont les ids sont `1` et `2`, utiliser le
service `getPokemon` pour les récupérer.

Créer la route dans `app.tsx`, l'URL peut etre par exemple `/pokemons/compare`

Créer un bouton en bas de la page `src/app/pages/pokemon-list.tsx`, sur son click appeler la méthode navigate (voir par
exemple `src/app/components/pokemon-card.tsx`)

Dans le composant `src/app/components/pokemon-card.tsx` déplacer le `onClick` sur un bouton "Details" dans la carte (on
se servira du click de la carte pour séléctionner les éléments à comparer), ajouter une checkbox pour sélectionner le pokemon à comparer, à ce stade, cocher uniquement la checkbox si l'id du pokemon vaut `1` ou `2`.

## Exercice 2 : Context

Créer un context `CompareContext` en s'inspirant de l'exemple :
[https://github.com/formation-tech/react-communication/tree/master/src/example-context-with-hooks](https://github.com/formation-tech/react-communication/tree/master/src/example-context-with-hooks)

Créer une interface ou un type TypeScript pour le context et l'exporter.

Au moment d'appeler createContext : `createContext<TypeDefini>(valeurSiNonProvided)`

L'idée est de stocker les id des pokemons à comparer dans le context (en utilisant par exemple un tableau), il faudra limiter à 2 pokemons (vous pouvez augmenter la limite si vous le souhaitez mais il faudra jouer sur le nombre de colonnes dans la page `PokemonCompare`).

Dans `src/app/components/pokemon-card.tsx` écouter le change de la checkbox pour sélectionner ou déselectionner le Pokemon à comparer. Le lien vers la page `/pokemons/compare` ne devrait être actif que s'il y a 2 pokemons à comparer.