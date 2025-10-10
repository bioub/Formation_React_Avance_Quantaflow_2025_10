import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PokemonsList from './pages/pokemon-list';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonEdit from './pages/pokemon-edit';
// import PokemonAdd from './pages/pokemon-add';
import PageNotFound from './pages/page-not-found';
import Login from './pages/login';
import PrivateRoute from './private-route';
import PokemonCompare from './pages/pokemon-compare';
import { CompareProvider } from './helpers/compare-context';
import { lazy, Suspense } from 'react';
import Loader from './components/loader';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const PokemonAdd = lazy(() => import('./pages/pokemon-add'));



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CompareProvider>
          <div>
            <nav>
              <div className="nav-wrapper teal">
                <Link to="/" className="brand-logo center">
                  Pokédex
                </Link>
              </div>
            </nav>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route index path="/" element={<PokemonsList />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/pokemons" element={<PokemonsList />} />
                  <Route path="/pokemon/add" element={<PokemonAdd />} />
                  <Route path="/pokemon/compare" element={<PokemonCompare />} />
                  <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
                  <Route path="/pokemons/:id" element={<PokemonsDetail />} />
                </Route>
                <Route element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </div>
        </CompareProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
