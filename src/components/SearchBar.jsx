import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import SearchResults from '../pages/SearchResults';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
    
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk';

    const container = document.getElementById('search');
    const search = createRoot(container);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const query_url = `${SEARCH_PATH}query=${query}&language=en-US`;
        console.log(query_url);

        const options = {
            method: 'GET',
            url: query_url,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                setMovies(response.data.results);
                console.log(movies);
            })
            .catch(function (error) {
                console.error(error);
            });

        search.render(<SearchResults results={movies} />)
    }



    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input 
                type='text' placeholder='Search' className='search-input'
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='search-icon-wrapper' >
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
            </button>
        </form>
    )
}

export default SearchBar;