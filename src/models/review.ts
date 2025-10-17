export interface ReviewAuthor {
    username: string;
    name: string;
    avatar_path: string | null;
    rating: number | null;
}

export interface Review {
    id: string;
    author: string;
    author_details: ReviewAuthor;
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}

export interface ReviewsResponse {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}

export interface ReviewSummary {
    id: string;
    author: string;
    rating: number | null;
    content: string;
    created_at: string;
    avatar_path: string | null;  
}