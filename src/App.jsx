import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'



const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [movie, setmovie] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
  const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

  const fetchMovies = async (query = '') => {
    setisLoading(true);
    seterrorMessage('');

    try {
      const endpoint = query
        ? `${SEARCH_URL}?query=${encodeURIComponent(query)}`
        : `${DISCOVER_URL}?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        seterrorMessage('No movies found');
        setmovie([]);
        return;
      }

      setmovie(data.results);
    } catch (error) {
    }finally{
    setisLoading(false);
  }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className='pattern'/> 

      <div className='wrapper'>
        
        <header>
          <img src='./hero.png' alt='Hero Banner'/>
          <h1>Movie <span className='text-gradient'>Finder</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? <Spinner /> : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>) : (
              <ul>
                {movie.map((item) => (
                 <MovieCard key={item.id} item={item}  />
                ))}
              </ul>
            )}
        </section>
       
      </div>
     
  </main>
  )
}

export default App