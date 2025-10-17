import type { Genre } from "./genre" ;
import type { ProductionCompany, ProductionCountry } from "./company";

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    video: boolean;
}

export interface MovieSummary {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
}

export interface MovieDetail {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    runtime: number | null;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: Genre[];
    adult: boolean;
    budget: number;
    revenue: number;
    status: string;
    tagline: string | null;
    homepage: string | null;
    imdb_id: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}