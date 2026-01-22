import { useState } from 'react'
import axios from 'axios'

type Movie = {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}


export default function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  async function searchMovies() {
    if (!query) return

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=c11e27c9fa5fb7bf817fbbf26274ae9d&query=${query}`
    )

    setMovies(response.data.results)
  }

 return (
  <div className="app">
    <h1>Movie Search</h1>

    <div className="search-box">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Digite o nome do filme"
      />
      <button onClick={searchMovies}>Search</button>
    </div>

    <>
  {movies.map(movie => (
    <li key={movie.id} className="movie">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
      />

      <div>
        <h3>{movie.title}</h3>
        <p>Ano: {movie.release_date?.slice(0, 4)}</p>
        <p>⭐ {movie.vote_average}</p>
      </div>
    </li>
  ))}
</>  </div>
)
}