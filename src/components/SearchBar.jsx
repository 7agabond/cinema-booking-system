import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie';
    
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const API_KEY = '8d517deb777b86cccc91638c870c1b89';

    const handleSubmit = async(event) => {
        const options = {
            method: 'GET',
            url: `${SEARCH_PATH}?query=${query}&include_adult=false&language=en-US&page=1`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk'
            }
        };

        axios
            .get(options)
            .then(function (response) {
                setMovies(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }    

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input 
                type='text' placeholder='Search' className='search-input'
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='search-icon-wrapper' onClick={handleSubmit}>
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
            </button>
        </form>
    )
}

export default SearchBar;