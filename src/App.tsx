import { useState } from 'react';
import Card from './components/Card';

type Movie = {
  id: string;
  title: string;
  src: string;
};

const generateKey = () => {
  return `card_${Math.random().toString(36).substr(2, 9)}`;
}

const generateImageUrl = () => {
  return `https://picsum.photos/150?random=${Math.random()}`;
}

const initMovies = [
  { title: "The Great Adventure" },
  { title: "Mystery of the Lost City" },
  { title: "Journey to the Unknown" },
  { title: "The Last Hero" },
  { title: "Rise of the Guardians" },
  { title: "The Hidden Treasure" },
  { title: "Escape from Reality" },
  { title: "The Final Countdown" },
  { title: "Quest for Glory" },
  { title: "The Secret Path" }
].map(movie => ({
  ...movie,
  id: generateKey(),
  src: generateImageUrl()
}));

const App = () => {
  const [movies] = useState<Movie[]>(initMovies);


  return (
    <div className="bg-gray-800 min-h-screen text-white flex justify-center items-center">
      <div className="p-4 w-full max-w-screen-lg">
        <header className="p-4">
          <h1 className="text-3xl font-bold">React App</h1>
        </header>

        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie: Movie) => (
            <Card key={movie.id} src={movie.src} title={movie.title} />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App