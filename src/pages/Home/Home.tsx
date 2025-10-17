import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb';
import type { Movie } from '../../models/movie';
import { MovieCard } from '../../components/features/MovieCard/MovieCard';
import { MovieGridSkeleton } from '../../components/common/Loading/Loading';

export const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const [popularRes, nowPlayingRes, upcomingRes] = await Promise.all([
          tmdbService.getPopularMovies(),
          tmdbService.getNowPlayingMovies(),
          tmdbService.getUpcomingMovies(),
        ]);

        setPopularMovies(popularRes.results?.slice(0, 12) || []);
        setNowPlayingMovies(nowPlayingRes.results?.slice(0, 12) || []);
        setUpcomingMovies(upcomingRes.results?.slice(0, 12) || []);
        
        setFeaturedMovie(popularRes.results?.[0] || null);
      } catch (err) {
        setError('Error al cargar las películas. Por favor, revisa tu conexión e intenta de nuevo.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-dark-900">
        <div className="text-center max-w-md p-8 bg-dark-800 rounded-xl shadow-2xl border border-red-500/30">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse rounded-full" />
            <svg
              className="relative w-24 h-24 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-4">¡Oops! Algo salió mal 😔</h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 text-lg font-bold bg-primary-600 text-white hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const sectionTitleClasses = "text-3xl md:text-5xl font-extrabold mb-3 text-slate-400 [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.8)]";
  const sectionLinkClasses = "inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-all group bg-dark-800/50 hover:bg-dark-800 px-5 py-3 rounded-xl border border-dark-700 hover:border-primary-500/50 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:ring-offset-dark-900 focus:ring-offset-2";
  const gridClasses = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10";
  const heroButtonClasses = "inline-flex items-center gap-2 font-bold text-xl px-10 py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-dark-900 focus:ring-offset-2";
  const primaryButtonClasses = `bg-dark-800/70 text-primary-400 border border-primary-500/50 hover:bg-dark-700/80 shadow-primary-500/20 focus:ring-primary-500/70`;

  return (
    <main id="main-content" className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section - Película Destacada */}
      {loading ? (
        <div className="relative h-[80vh] bg-dark-800/70 animate-pulse border-b border-dark-700" />
      ) : featuredMovie && (
        <section className="relative h-[80vh] overflow-hidden group border-b border-dark-700 shadow-2xl" aria-labelledby="featured-movie">
          <div className="absolute inset-0">
            <img
              src={tmdbService.getImageUrl(featuredMovie.backdrop_path || '')}
              alt={`Fondo de la película ${featuredMovie.title}`}
              className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-[5000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/60" />
            <div className="absolute inset-0 bg-dark-900/10" />
          </div>

          <div className="relative h-full container-custom flex items-end pb-16 md:pb-28">
            <div className="max-w-4xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-md px-5 py-2.5 rounded-full mb-5 border border-primary-500/40 shadow-xl shadow-primary-500/20 transform hover:scale-[1.03] transition-transform duration-500">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-primary-400 font-extrabold text-sm tracking-widest uppercase">DESTACADA</span>
              </div>

              <h1 id="featured-movie" className="text-6xl md:text-8xl font-extrabold text-white mb-6 [text-shadow:_0_5px_15px_rgb(0_0_0_/_0.8)] leading-tight">
                {featuredMovie.title}
              </h1>

              <div className="flex items-center gap-6 mb-7 text-slate-200">
                <div className="flex items-center gap-2 bg-dark-800/70 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-dark-700">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-xl">{featuredMovie.vote_average.toFixed(1)}</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-primary-400/80 shadow-md shadow-primary-500/50" aria-hidden="true" />
                <span className="text-xl font-medium">{new Date(featuredMovie.release_date).getFullYear()}</span>
              </div>

              <p className="text-lg md:text-xl text-slate-300 mb-10 line-clamp-3 [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.5)] leading-relaxed max-w-3xl">
                {featuredMovie.overview}
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Botón Ver Detalles - Primario y sobrio */}
                <Link
                  to={`/movie/${featuredMovie.id}`}
                  className={`${heroButtonClasses} ${primaryButtonClasses}`}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
            <svg className="w-6 h-6 text-primary-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      )}
      
      {/* Películas Populares */}
      <section className="container-custom py-16 md:py-24" aria-labelledby="popular-section">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 id="popular-section" className={sectionTitleClasses}>
              Películas Populares 🔥
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full mt-2" />
          </div>
          <Link to="/popular" className={sectionLinkClasses}>
            <span className="hidden sm:inline">Ver todas</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <MovieGridSkeleton count={12} />
        ) : (
          <div className={gridClasses}>
            {popularMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 80}ms` }} 
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Películas En Cartelera */}
      <section className="bg-dark-800 py-16 md:py-24" aria-labelledby="now-playing-section">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 id="now-playing-section" className={sectionTitleClasses}>
                En Cartelera 🎬
              </h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full mt-2" />
            </div>
            <Link to="/now-playing" className={sectionLinkClasses}>
              <span className="hidden sm:inline">Ver todas</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <MovieGridSkeleton count={12} />
          ) : (
            <div className={gridClasses}>
              {nowPlayingMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }} 
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Próximos Estrenos */}
      <section className="container-custom py-16 md:py-24" aria-labelledby="upcoming-section">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 id="upcoming-section" className={sectionTitleClasses}>
              Próximos Estrenos 📅
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full mt-2" />
          </div>
          <Link to="/upcoming" className={sectionLinkClasses}>
            <span className="hidden sm:inline">Ver todas</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <MovieGridSkeleton count={12} />
        ) : (
          <div className={gridClasses}>
            {upcomingMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }} 
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section - Buscador */}
      <section className="relative overflow-hidden py-24 md:py-36 bg-dark-900 border-t border-primary-500/30">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-lg" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-lg animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-lg animation-delay-4000" />
        </div>

        <div className="relative container-custom text-center p-8 bg-dark-900/70 backdrop-blur-sm rounded-xl border border-primary-500/20 shadow-2xl shadow-primary-500/10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 [text-shadow:_0_4px_10px_rgb(0_0_0_/_0.5)]">
            ¿Buscas algo específico? 🔎
          </h2>
          <p className="text-xl md:text-2xl text-primary-200/90 mb-12 max-w-4xl mx-auto leading-relaxed [text-shadow:_0_1px_5px_rgb(0_0_0_/_0.5)]">
            Explora nuestra extensa colección de películas y encuentra tu próxima favorita con solo una búsqueda.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-4 bg-dark-700 text-primary-500 hover:bg-dark-600 px-12 py-5 rounded-3xl font-bold text-2xl transition-all duration-300 shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-primary-500/70 focus:ring-offset-dark-900 focus:ring-offset-4 group"
          >
            <svg className="w-8 h-8 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Iniciar Búsqueda
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
