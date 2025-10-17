export interface Video {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: VideoType;
    official: boolean;
    published_at: string;
}

export type VideoType = 'Trailer' | 'Teaser' |'Clip' |
    'Featurette' | 'Behind the Scenes' | 'Bloopers' |
    'Opening Credits';

export interface VideosResponse {
    id: number;
    results: Video[];
}

export interface GroupedVideos {
    trailes: Video[];
    teasers: Video[];
    clips: Video[];
    behindTheScenes: Video[];
    other: Video[];
}

export interface VideoEmbed {
    url: string;
    thumbnailUrl: string;
    title: string;
}