
import type { MovieDetail } from '../../../../models/movie';
import { tmdbService } from '../../../../services/tmdb';

interface MovieHeaderProps {
  movie: MovieDetail;
}

export const MovieHeader = ({ movie }: MovieHeaderProps) => {
  return (
    <section className="relative h-[80vh] overflow-hidden group border-b border-dark-700 shadow-2xl" aria-labelledby="featured-movie">
      <div className="absolute inset-0">
        <img
          src={tmdbService.getImageUrl(movie.backdrop_path || '')}
          alt={`Fondo de la película ${movie.title}`}
          className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-[5000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/60" />
        <div className="absolute inset-0 bg-dark-900/10" />
      </div>

      <div className="relative h-full container-custom flex items-end pb-16 md:pb-28">
        <div className="max-w-4xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h1 id="featured-movie" className="text-6xl md:text-8xl font-extrabold text-white mb-6 [text-shadow:_0_5px_15px_rgb(0_0_0_/_0.8)] leading-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-6 mb-7 text-slate-200">
            <div className="flex items-center gap-2 bg-dark-800/70 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-dark-700">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-xl">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-primary-400/80 shadow-md shadow-primary-500/50" aria-hidden="true" />
            <span className="text-xl font-medium">{new Date(movie.release_date).getFullYear()}</span>
          </div>

          <p className="text-lg md:text-xl text-slate-300 mb-10 line-clamp-3 [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.5)] leading-relaxed max-w-3xl">
            {movie.overview}
          </p>
        </div>
      </div>
    </section>
  );
};
