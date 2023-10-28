import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';

// Ensure that your backend server is running on the correct port
const BACKEND_URL = 'http://localhost:8000/api';

const MoviesCard = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(props.sectionTitle);
  }, [props.sectionTitle]);

  const fetchMovies = async (sectionTitle) => {
    try {
      const endpoint = sectionTitle.toLowerCase().replace(/\s/g, '-');
      const { data } = await axios.get(`${BACKEND_URL}/get-movies/${endpoint}`);
      if (data && data.results) {
        setMovies(data.results);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className='movies-card'>
      <h2>{props.sectionTitle}</h2>
      <div className='movies'>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Link to={props.sectionTitle.toLowerCase()}><button className='CTA-button-one'>View all</button></Link>
    </div>
  );
};

export default MoviesCard;
