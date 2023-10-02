import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie';
    
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const API_KEY = '8d517deb777b86cccc91638c870c1b89';

    const handleSubmit = async(event) => {
        const {data} = await axios.get(`${SEARCH_PATH}?query=${query}&include_adult=true&language=en-US&page=1`,
        {
            params: {
                api_key: API_KEY
            }
        })
        setMovies(data.results);
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