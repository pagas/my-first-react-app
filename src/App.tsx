import { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';

type Movie = {
  id: string;
  title: string;
  src: string;
};


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  methods: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('An error occurred while fetching movies');
      }
      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <li className='text-white' key={movie.id}>
                  {/* <img src={movie.src} alt={movie.title} /> */}
                  <h3>{movie.title}</h3>
                </li>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>


    // <div className="bg-gray-800 min-h-screen text-white flex justify-center items-center">
    //   <div className="p-4 w-full max-w-screen-lg">
    //     <header className="p-4">
    //       <h1 className="text-3xl font-bold">React App</h1>
    //     </header>

    //     <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {movies.map((movie: Movie) => (
    //         <Card key={movie.id} src={movie.src} title={movie.title} />
    //       ))}
    //     </main>
    //   </div>
    // </div>
  )
}

export default App