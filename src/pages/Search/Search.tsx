import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb';
import type { Movie } from '../../models/movie';
import { MovieCard } from '../../components/features/MovieCard/MovieCard';
import { MovieGridSkeleton } from '../../components/common/Loading/Loading';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchParams({ q: query });

    try {
      const response = await tmdbService.searchMovies(query);
      setSearchResults(response.results || []);
    } catch (err) {
      setError('Error al buscar películas. Inténtalo de nuevo.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch();
    }
  }, []);

  const gridClasses = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10";

  return (
    <main className="min-h-screen bg-dark-900 text-white container-custom py-12">
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 [text-shadow:_0_4px_10px_rgb(0_0_0_/_0.5)]">
          Busca una Película
        </h1>
        <p className="text-lg md:text-xl text-primary-200/90 max-w-3xl mx-auto leading-relaxed">
          Encuentra información, calificaciones y más sobre cualquier película que se te ocurra.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-12 max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe el nombre de una película..."
            className="w-full px-6 py-4 text-xl bg-dark-800/70 border-2 border-dark-700 rounded-xl focus:ring-4 focus:ring-primary-500/70 focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && <MovieGridSkeleton count={18} />}
      
      {error && (
        <div className="text-center text-red-500 bg-red-500/10 p-6 rounded-xl border border-red-500/30">
          <p className="text-xl font-bold">¡Error! 😔</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && searchResults.length === 0 && (
        <div className="text-center text-slate-400 bg-dark-800/50 p-10 rounded-xl border border-dark-700">
          <h3 className="text-3xl font-bold text-white mb-3">Sin resultados</h3>
          <p className="text-lg">No se encontraron películas para "{query}". Intenta con otro término.</p>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className={gridClasses}>
          {searchResults.map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Search;
