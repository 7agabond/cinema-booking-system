import react from 'react';
import axios from 'axios';
import '../stylings/moviecard.css';


const MovieCard = ({ movie }) => {

	const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
	return (
		<div className="movie-card">
			
            <img className='front' src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
            <h3 className='movie-title'>{movie.title}</h3>
            <div className='movie-info'>2 HR 15 MIN • PG</div>
		</div>
	);
};

export default MovieCard;