import type { Movie } from '../../../models/movie';
import { tmdbService } from '../../../services/tmdb';
import { Link } from 'react-router-dom'; 

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path 
    ? tmdbService.getImageUrl(movie.poster_path, 'w342')
    : 'https://placehold.co/342x513/1e293b/94a3b8?text=No+Poster';
    
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="
        block h-full
        bg-dark-800 
        text-white 
        rounded-xl 
        shadow-2xl 
        shadow-dark-900/50 
        overflow-hidden 
        transition-all 
        duration-300 
        transform 
        hover:scale-[1.03] 
        hover:shadow-primary-500/50 
        cursor-pointer
        group
      "
    >
      {/* Contenedor de la imagen */}
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={imageUrl}
          alt={`Póster de ${movie.title}`} 
          className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 group-hover:opacity-90"
          onError={(e) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = 'https://placehold.co/342x513/1e293b/94a3b8?text=No+Poster'; 
          }}
        />
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4 pt-3">
        <h3 className="text-lg font-semibold mb-1 truncate leading-tight" title={movie.title}>
          {movie.title}
        </h3>
        
        <p className="text-sm text-slate-400 font-medium">{year}</p>
      </div>
    </Link>
  );
};