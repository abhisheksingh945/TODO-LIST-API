const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
var format = require('pg-format');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
 
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { title, description,  priority } = req.body;
    
    const newTodo = await pool.query(
      "INSERT INTO todo (title, description, state, priority, creationdate) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [title, description, 0, priority, new Date()]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
 
//get all todos



// search
app.get("/todos/searchstate", async (req, res) => {
   try {
     console.log(req.query.state);
    const todo = await pool.query("SELECT * FROM todo WHERE state = $1", [
      req.query.state  
    ]);    
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/searchpriority", async (req, res) => {
   try {
         
    const todo = await pool.query("SELECT * FROM todo WHERE priority = $1", [
      req.query.priority  
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/todos/searchdate", async (req, res) => {
   try {
    const { id } = req.params;
    
    const todo = await pool.query("SELECT * FROM todo WHERE date = $1", [
      req.query.date  
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/todos/searchtitle", async (req, res) => {
   try {
    const { id } = req.params;
    
    const todo = await pool.query("SELECT * FROM todo WHERE title = $1", [
      req.query.title  
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//get a todo

app.get("/todos/:id", async (req, res) => {
   try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, state, priority} = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET  title= $1, description = $2, state = $3, priority = $4, creationdate = $5 WHERE todo_id = $6",
      [title, description, state, priority, new Date(), id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

 
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
