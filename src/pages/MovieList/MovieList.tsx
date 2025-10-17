import { useEffect, useState, useCallback, useRef } from 'react';
import { tmdbService } from '../../services/tmdb';
import type { Movie } from '../../models/movie';
import { MovieCard } from '../../components/features/MovieCard/MovieCard';
import { MovieGridSkeleton } from '../../components/common/Loading/Loading';

interface MovieListProps {
  type: 'popular' | 'top-rated' | 'upcoming' | 'now-playing';
  title: string;
}

type MovieFetchMap = {
  [key in MovieListProps['type']]: (page: number) => ReturnType<typeof tmdbService.getPopularMovies>;
};

const movieFetchMap: MovieFetchMap = {
  'popular': tmdbService.getPopularMovies,
  'top-rated': tmdbService.getTopRatedMovies,
  'upcoming': tmdbService.getUpcomingMovies,
  'now-playing': tmdbService.getNowPlayingMovies,
};

export const MovieList = ({ type, title }: MovieListProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    // Reset state when type changes
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setError(null);
  }, [type]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchFunction = movieFetchMap[type];
        const response = await fetchFunction(page);
        
        setMovies(prevMovies => {
          const newMovieIds = new Set(prevMovies.map(m => m.id));
          const uniqueNewMovies = response.results.filter(m => !newMovieIds.has(m.id));
          return [...prevMovies, ...uniqueNewMovies];
        });

        setHasMore(response.page < response.total_pages);
      } catch (err) {
        setError('Error al cargar las películas. Por favor, intenta de nuevo más tarde.');
        console.error(`Error fetching ${type} movies:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchMovies();
    }
  }, [type, page]);

  const sectionTitleClasses = "text-4xl md:text-6xl font-extrabold text-slate-100 [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.8)]";
  const gridClasses = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10";

  return (
    <main id="main-content" className="container-custom py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className={sectionTitleClasses}>{title}</h1>
        <div className="mt-4 h-1.5 w-40 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full mx-auto" />
      </div>

      {movies.length > 0 && (
        <div className={gridClasses}>
          {movies.map((movie, index) => {
            const isLastElement = movies.length === index + 1;
            return (
              <div
                ref={isLastElement ? lastMovieElementRef : null}
                key={`${movie.id}-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index % 20) * 50}ms` }}
              >
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <div className={movies.length > 0 ? "mt-12" : ""}>
           <MovieGridSkeleton count={movies.length > 0 ? 6 : 18} />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="max-w-md p-8 bg-dark-800 rounded-xl shadow-2xl border border-red-500/30">
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse rounded-full" />
              <svg className="relative w-24 h-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">¡Error!</h2>
            <p className="text-slate-400">{error}</p>
          </div>
        </div>
      )}

      {!hasMore && !loading && movies.length > 0 && (
        <div className="text-center py-16 text-slate-500 font-semibold">
          <p>Has llegado al final de la lista.</p>
        </div>
      )}
    </main>
  );
};

export default MovieList;
