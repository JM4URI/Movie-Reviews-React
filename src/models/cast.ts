export interface Cast {
    id: number;
    name: string;
    character: string;
    gender: number;
    order: number;
    profile_path: string | null;
    credit_id: string;
    know_for_department: string;
    cast_id: number;
    adult: boolean;
    popularity: number;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
    deparment: string;
    gender: number;
    profile_path: string | null;
    credit_id: string;
    know_for_department: string;
    adult: boolean;
    popularity: number;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface MainCredits {
    director?: Crew;
    writers: Crew[];
    mainCast: Cast[];
}