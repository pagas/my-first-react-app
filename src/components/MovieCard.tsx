import { useState } from 'react';

type Movie = {
    id: string;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
};

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }: { movie: Movie }) => {

    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <li className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : './no-movie.png'} alt={title} />
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src="./star.svg" alt="star icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className='lang'>{original_language}</p>
                    <span>•</span>

                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </li>
    );
};

export default MovieCard;