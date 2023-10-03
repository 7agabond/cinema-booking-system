import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
    
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const API_KEY = '8d517deb777b86cccc91638c870c1b89';
    
    const handleSubmit = (event) => {
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

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
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
            <button className='search-icon-wrapper' >
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
             </button>
        </form>
    )
}

export default SearchBar;