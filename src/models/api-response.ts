export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_results: number;
    total_pages: number;
}

export interface MovieResponse extends PaginatedResponse<any> {
    dates?: {
        maximum: string;
        minimum: string;
    };    
}

export interface TMDB {
    status_code: number;
    status_message: string;
    success: boolean;
}

export interface RequestState<T> {
    loading: boolean;
    data: T | null;
    error: string | null;
}

export interface ApiRequestConfig {
    language?: string;
    page?: number;
    region?: string;
    include_adult?: boolean;
}

export interface SearchParams extends ApiRequestConfig {
    query: string;
    year?: number;
    primary_release_year?: number;
}

export interface DiscoverParams extends ApiRequestConfig {
    sort_by: string;
    with_genres?: string | null;
    year?: number;
    "release_date.gte"?: string;
    "release_date.lte"?: string;
    "vote_average.gte"?: number;
    "vote_average.lte"?: number;
    "vote_count.gte"?: number;
}   