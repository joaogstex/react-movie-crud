import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express()


const database = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"Coxinhacsgo1@",
   database:"db"


})


app.use(express.json())
app.use(cors())


app.get("/", (request, response) => {
  response.json("backend")
})


app.get("/movies", (request, response) => {
  const qry = "SELECT * FROM movies"
  database.query(qry,(err,data)=>{
    if(err) {
      return response.json(err)
    } else {
      return response.json(data)
    }
  })
})

//lembrar de melhorar a query da database para retornar só o primeiro e não a lista que tem o primeiro
app.get("/movies/:id", (request, response) => {
  const movieId = request.params.id
  const qry = "SELECT * FROM movies WHERE id = ?"

  database.query(qry, [movieId], (err,data)=>{
    if(err) {
      return response.json(err)
    } else {
      return response.json(data[0])
    }
  })
})

app.post("/movies", (request, response)=> {
  const qry = "INSERT INTO movies (`title`,`description`, `image`, `price`) VALUES (?, ?, ?, ?)"
  const values = [request.body.title, request.body.description, request.body.image, request.body.price]
  database.query(qry, values, (err, data)=> {
    if(err) {
      return response.json(err)
    } else {
      return response.json("Movie has been added to the movies page!")
    }
  })
})


app.delete("/movies/:id", (request, response) => {
  const movieId = request.params.id
  const qry = "DELETE FROM movies WHERE id = ?"


  database.query(qry,[movieId],(err,data)=>{
    if(err){
      return response.json(err)
    }else{
      return response.json("The Movie has been deleted from the shop successfully!")
    }
  })
})


app.put("/movies/:id", (request, response) => {
  const movieId = request.params.id
  const qry = "UPDATE movies SET `title` = ?, `description` = ?, `image` = ?, `price` = ? WHERE id = ?"


  const values = [request.body.title, request.body.description, request.body.image, request.body.price, movieId]


  database.query(qry, values, (err,data)=>{
    if(err){
      return response.json(err)
    }else{
      return response.json("The Movie has been updated from the shop successfully!")
    }
  })
})




app.listen(8800, ()=>{
  console.log("Connected.")
})