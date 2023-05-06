import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const Update = () => {
  const { id: movieId } = useParams()
  const[movie, setMovie] = useState({
    title:"",
    description:"",
    image: "",
    price:null,
    imageLink: ""
  })

  useEffect( ()  => {
    axios.get("http://localhost:8800/movies/" + movieId).then((response) => {
      setMovie(response.data)
    })
  }, [movieId])

  const navigate = useNavigate()
  const location = useLocation()



  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value}))
  };
 


  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/movies/" + movieId, movie)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  console.log(movie)
  return (
    <div className='form'>
      <h1>Update selected Movie</h1>
      <input type="text" placeholder="Insert Title Here" onChange={handleChange} value={movie.title} name="title"/>
      <input type="text" placeholder="Insert Description Here" onChange={handleChange} value={movie.description} name="description" />
      <input type="text" placeholder="Insert Image Link Here" onChange={handleChange} value={movie.image} name="image"/>
      <input type="number" placeholder="Insert Price Here" onChange={handleChange} value={movie.price} name="price"/>
   
    <button className='formButton' onClick={handleClick}>Update Movie</button>
    </div>
  )
}


export default Update