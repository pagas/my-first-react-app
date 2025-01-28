
const Card = ({ src, title }: { src: string, title: string }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={src} alt="placeholder" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
        <p className="text-gray-700">Card Description</p>
      </div>
    </div>
  )
}

const App = () => {
  const generateKey = () => {
    return `card_${Math.random().toString(36).substr(2, 9)}`;
  }

  const generateImageUrl = () => {
    return `https://picsum.photos/150?random=${Math.random()}`;
  }

  const movies = [
    { id: generateKey(), title: "The Great Adventure", src: generateImageUrl() },
    { id: generateKey(), title: "Mystery of the Lost City", src: generateImageUrl() },
    { id: generateKey(), title: "Journey to the Unknown", src: generateImageUrl() },
    { id: generateKey(), title: "The Last Hero", src: generateImageUrl() },
    { id: generateKey(), title: "Rise of the Guardians", src: generateImageUrl() },
    { id: generateKey(), title: "The Hidden Treasure", src: generateImageUrl() },
    { id: generateKey(), title: "Escape from Reality", src: generateImageUrl() },
    { id: generateKey(), title: "The Final Countdown", src: generateImageUrl() },
    { id: generateKey(), title: "Quest for Glory", src: generateImageUrl() },
    { id: generateKey(), title: "The Secret Path", src: generateImageUrl() }
  ];

  return (
    <div className="bg-gray-800 min-h-screen text-white flex justify-center items-center">
      <div className="p-4 w-full max-w-screen-lg">
        <header className="p-4">
          <h1 className="text-3xl font-bold">React App</h1>
        </header>

        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map(movie => (
            <Card key={movie.id} src={movie.src} title={movie.title} />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App