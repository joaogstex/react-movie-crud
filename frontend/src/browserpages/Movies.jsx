import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Movies = () => {
  const [movies, setMovies] = useState([])


  useEffect(()=>{
    const fetchAllMovies = async ()=> {
      try{
      const resp = await axios.get("http://localhost:8800/movies")
      setMovies(resp.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllMovies()
  },[])


  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this movie?");
      if (confirmed) {
        await axios.delete("http://localhost:8800/movies/" + id);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>Movie Shop On-line</h1>
      <div className="movies">
        {movies.map(movie=>(
          <div className="movie" key={movie.id}>
            {movie.image && <img src={movie.image} alt=""/>}
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <span>Movie Price: ${movie.price}</span>
            <button className="delete" onClick={()=>handleDelete(movie.id)}>Delete Movie 🗑</button>
            <button className="update"><Link to={`/update/${movie.id}`}>Update Movie 🖊</Link></button>
            </div>
        ))}
      </div>
      <button className='movieButton'><Link to="/add">Add new movie</Link></button>
    </div>
  )
}


export default Movies