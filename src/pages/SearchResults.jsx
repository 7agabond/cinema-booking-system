import MovieCard from "../components/MovieCard";

const SearchResults = (props) => {
  return (
      <div className='search-card'>
          <h2>{props.titleOne}</h2>
          <div className='movies'>
              {props.results.map(movie => (
                  <div className='movie' key={movie.id}>
                      <MovieCard key={movie.id} movie={movie} poster={movie.poster_path} />
                  </div>
              ))};
          </div>
      </div>
  )
}

export default SearchResults;