export type Movie = {
    id: string;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
};

export type TrendingMovie = {
    $id: string;
    searchTerm: string;
    count: number;
    poster_url: string;
    movie_id: string;
};