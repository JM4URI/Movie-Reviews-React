import { CacheService } from "./cache";
import { environment } from "../environments/environment";
import type { PaginatedResponse } from "../models/api-response";
import type { Movie, MovieDetail } from "../models/movie";
import type { Cast } from "../models/cast";
import type { Review } from "../models/review";
import type { Video } from "../models/video";
import type { Genre } from "../models/genre";

const API_URL = environment.tmdb.baseUrl;
const API_KEY = environment.tmdb.apiKey;
const IMAGE_BASE_URL = environment.tmdb.imageBaseUrl;
const DEFAULT_LANGUAGE = environment.tmdb.defaultLanguage;
const DEFAULT_REGION = environment.tmdb.defaultRegion;

const cache = new CacheService();

function buildParams(config: Record<string, any> = {}): URLSearchParams {
  const params = new URLSearchParams();
  params.set("api_key", API_KEY);
  params.set("language", config.language || DEFAULT_LANGUAGE);
  params.set("region", config.region || DEFAULT_REGION);

  Object.keys(config).forEach(key => {
    if (key !== "language" && key !== "region" && config[key] !== undefined) {
      params.set(key, Array.isArray(config[key]) ? config[key].join(",") : config[key].toString());
    }
  });

  return params;
}

async function request<T>(endpoint: string, config: Record<string, any> = {}, cacheKey?: string, ttl = 300000): Promise<T> {
  if (cacheKey) {
    const cached = cache.get<T>(cacheKey);
    if (cached) return cached;
  }

  try {
    const params = buildParams(config);
    const response = await fetch(`${API_URL}${endpoint}?${params.toString()}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data: T = await response.json();

    if (cacheKey) cache.set(cacheKey, data, ttl);
    return data;
  } catch (error) {
    console.error(`Request failed [${endpoint}]`, error);
    throw error;
  }
}

export const tmdbService = {
  getPopularMovies: (page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/popular`, { page }, `popular-${page}`),

  getTopRatedMovies: (page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/top_rated`, { page }, `toprated-${page}`),

  getNowPlayingMovies: (page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/now_playing`, { page }, `nowplaying-${page}`),

  getUpcomingMovies: (page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/upcoming`, { page }, `upcoming-${page}`),

  getMovieDetails: (movieId: number) =>
    request<MovieDetail>(`/movie/${movieId}`, {}, `movie-${movieId}`, 600000),

  getSimilarMovies: (movieId: number, page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`, { page }, `similar-${movieId}-${page}`),

  getRecommendations: (movieId: number, page = 1) =>
    request<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`, { page }),

  searchMovies: (query: string, page = 1) =>
    request<PaginatedResponse<Movie>>(`/search/movie`, { query, page }),

  discoverMovies: (params: Record<string, any>) =>
    request<PaginatedResponse<Movie>>(`/discover/movie`, params),

  getMovieCredits: (movieId: number) =>
    request<{ id: number; cast: Cast[] }>(`/movie/${movieId}/credits`, {}, `credits-${movieId}`, 600000),

  getMovieReviews: (movieId: number, page = 1) =>
    request<PaginatedResponse<Review>>(`/movie/${movieId}/reviews`, { page }),

  getMovieVideos: (movieId: number) =>
    request<{ id: number; results: Video[] }>(`/movie/${movieId}/videos`, {}, `videos-${movieId}`, 600000).then(r => r.results),

  getGenres: () =>
    request<{ genres: Genre[] }>(`/genre/movie/list`, {}, "genres", 86400000).then(r => r.genres),

  getImageUrl: (path: string | null, size: string = "original") => {
    if (!path) return "/assets/images/no-image.jpg";
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
};
    