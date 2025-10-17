import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb';
import type { MovieDetail as MovieDetailModel } from '../../models/movie';
import type { Cast } from '../../models/cast';
import type { Review } from '../../models/review';
import type { Video } from '../../models/video';
import { MovieHeader } from '../../components/features/MovieDetail/MovieHeader/MovieHeader';
import { CastCarousel } from '../../components/features/MovieDetail/CastCarousel/CastCarousel';
import { ReviewList } from '../../components/features/MovieDetail/ReviewList/ReviewList';
import { MovieInfo } from '../../components/features/MovieDetail/MovieInfo/MovieInfo';
import { VideoPlayer } from '../../components/features/MovieDetail/VideoPlayer/VideoPlayer';

const MovieDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[80vh] bg-dark-800/70" />
    <div className="container-custom py-12">
      <div className="w-3/4 h-8 bg-dark-700 rounded mb-6" />
      <div className="w-full h-4 bg-dark-700 rounded mb-4" />
      <div className="w-full h-4 bg-dark-700 rounded mb-4" />
      <div className="w-1/2 h-4 bg-dark-700 rounded" />
    </div>
  </div>
);

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailModel | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const movieId = parseInt(id, 10);

        const [movieDetails, credits, movieReviews, movieVideos] = await Promise.all([
          tmdbService.getMovieDetails(movieId),
          tmdbService.getMovieCredits(movieId),
          tmdbService.getMovieReviews(movieId),
          tmdbService.getMovieVideos(movieId),
        ]);

        setMovie(movieDetails);
        setCast(credits.cast);
        setReviews(movieReviews.results);
        setVideos(movieVideos);

      } catch (err) {
        setError('Error al cargar los detalles de la película.');
        console.error('Error fetching movie data:', err);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchMovieData();
  }, [id]);

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center px-4 bg-dark-900 text-center text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center px-4 bg-dark-900 text-center">No se encontró la película.</div>;
  }

  return (
    <main id="main-content">
      <MovieHeader movie={movie} />
      {cast.length > 0 && <CastCarousel cast={cast} />}
      <MovieInfo movie={movie} />
      {videos.length > 0 && <VideoPlayer videos={videos} />}
      {reviews.length > 0 && <ReviewList reviews={reviews} />}
    </main>
  );
};

export default MovieDetail;