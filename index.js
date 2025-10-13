import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import { title } from "process";

const app = express();
const port = 3000;
const API_URL = "https://bookcover.longitood.com/bookcover";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookNote",
  password: "61516151",
  port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let errorCondition = false;
let successMessage = false;
let userAuth = false;
let userId;
let coverUrl;
let createdAt;
let sort = false;
let currentSort = "Sort Posts";


app.get("/", async (req, res) => {
if(sort === false){

if(userAuth){
  try {
    const result = await db.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY posts.id DESC",
      [userId]
    );
    console.log(result.rows);
  res.render("index.ejs", {
    success: successMessage,
    user: userAuth,
    posts: result.rows,
    caption: "Your Published Book Notes",
    sortOption: currentSort,
  });
  successMessage = false;
    
  } catch(err) {
    console.log(err.message);

  }
} else {
  try {
    const result = await db.query(
      "SELECT username, title, author, notes, rating, cover, user_id, created_at FROM register JOIN posts ON register.id = user_id ORDER BY posts.id DESC");
    console.log(result.rows);
  res.render("index.ejs", {
    success: successMessage,
    posts: result.rows,
    caption: "The Latest Book Notes From Our Writers",
    sortOption: currentSort,
  });
  successMessage = false;
    
  } catch(err) {
    console.log(err.message);

  }
}  


} else {
if(userAuth){
  try {
    const result = await db.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY rating DESC",
      [userId]
    );
    console.log(result.rows);
  res.render("index.ejs", {
    success: successMessage,
    user: userAuth,
    posts: result.rows,
    caption: "Your Published Book Notes",
    sortOption: currentSort,
  });
  successMessage = false;
    
  } catch(err) {
    console.log(err.message);

  }
} else {
  try {
    const result = await db.query(
      "SELECT username, title, author, notes, rating, cover, user_id, created_at FROM register JOIN posts ON register.id = user_id ORDER BY rating DESC");
    console.log(result.rows);
  res.render("index.ejs", {
    success: successMessage,
    posts: result.rows,
    caption: "The Latest from Our Writers",
    sortOption: currentSort,
  });
  successMessage = false;
    
  } catch(err) {
    console.log(err.message);

  }
}  

}
});

app.get("/rating", async (req, res) => {
  sort = true;
  currentSort = "By Rating"
  res.redirect("/");
});
app.get("/date", async (req, res) => {
  sort = false;
  currentSort = "By Date"
  res.redirect("/");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs", {
    registerTitle: "Create Account",
    registerSubmit: "Sign Up",
    error: errorCondition,
  });
  errorCondition = false;
});

app.get("/login", async (req, res) => {
  res.render("register.ejs", {
    registerTitle: "Welcome Back",
    registerSubmit: "Log In",
    error: errorCondition,
  });
  errorCondition = false;
});

app.get("/logout", async (req, res) => {
  userAuth = false;
  res.redirect("/");
});
app.get("/dashboard", async (req, res) => {

  try {
    const result = await db.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [userId]
    );
    console.log(result.rows);
  
    res.render("dashboard.ejs", { posts: result.rows, error: errorCondition, user: userAuth });
    errorCondition = false;
  } catch(err) {
    console.log(err.message);

  }

  
});

app.post("/auth/signup", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO register (username, password) VALUES ($1, $2)",
      [req.body.username, req.body.password]
    );
    successMessage =
      "Account created successfully! Use Log In to sign into your account";
    res.redirect("/");
  } catch (err) {
    console.log("Error: " + err.message);
    errorCondition = "Invalid username or password, try again";
    res.redirect("/register");
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM register WHERE username = $1 AND password = $2",
      [req.body.username, req.body.password]
    );
    console.log(result.rows);
    if (result.rows.length !== 0) {
      successMessage = `Hello ${req.body.username}, Wellcome back `;
      userAuth = true;
      userId = result.rows[0].id;
      console.log(userId);

      res.redirect("/");
    } else {
      errorCondition = "Invalid username or password, try again";
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Error: " + err.message);
    errorCondition = "Invalid username or password, try again";
    res.redirect("/login");
  }
});

app.post("/dashboard/post", async (req, res) => {
  console.log(req.body.autoCover);
  createdAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  if (req.body.autoCover === "yes") {
    try {
      const response = await axios.get(
        `${API_URL}?book_title=${req.body.title}&author_name=${req.body.author}`
      );
      console.log(response.data.url);
      coverUrl = response.data.url;

      try {
        await db.query(
          "INSERT INTO posts (title, author, notes, rating, cover, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
            createdAt,
          ]
        );
        successMessage = "Your book added successfully";
        res.redirect("/");
      } catch (error) {
        console.log("Error: " + error.message);
        errorCondition = "Invalid Inputs, please try again";
        res.redirect("/dashboard");
      }
    } catch (error) {
      console.log("Error: " + error.message);
      errorCondition = "Invalid Author Name or Book Title, please try again";
      res.redirect("/dashboard");
    }
  } else {
    coverUrl = "";
    try {
        await db.query(
          "INSERT INTO posts (title, author, notes, rating, cover, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
            createdAt,
          ]
        );
        successMessage = "Your book added successfully";
        res.redirect("/");
      } catch (error) {
        console.log("Error: " + error.message);
        errorCondition = "Invalid Inputs, please try again";
        res.redirect("/dashboard");
      }


  }
});

app.post("/dashboard/edit/:id", async (req, res) => {
  createdAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const id = parseInt(req.params.id);
  if (req.body.autoCover === "yes") {
    try {
      const response = await axios.get(
        `${API_URL}?book_title=${req.body.title}&author_name=${req.body.author}`
      );
      console.log(response.data.url);
      coverUrl = response.data.url;

      try {
        await db.query(
          "UPDATE posts SET title = $1, author = $2 , notes = $3, rating = $4, cover = $5, created_at = $6 WHERE id = $7",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            createdAt,
            id
          ]
        );
        successMessage = "Your book Updated successfully";
        res.redirect("/");
      } catch (error) {
        console.log("Error: " + error.message);
        errorCondition = "Invalid Inputs, please try again";
        res.redirect("/dashboard");
      }
    } catch (error) {
      console.log("Error: " + error.message);
      errorCondition = "Invalid Author Name or Book Title, please try again";
      res.redirect("/dashboard");
    }
  } else {
    coverUrl = "";
    try {
        await db.query(
          "UPDATE posts SET title = $1, author = $2 , notes = $3, rating = $4, cover = $5, created_at = $6 WHERE id = $7",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            createdAt,
            id
          ]
        );
        successMessage = "Your book Updated successfully";
        res.redirect("/");
      } catch (error) {
        console.log("Error: " + error.message);
        console.log(error);
        console.log(id);
        
        
        errorCondition = "Invalid Inputs, please try again";
        res.redirect("/dashboard");
      }


  }
});


app.post("/dashboard/delete/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM posts WHERE id = $1",
      [req.params.id]
    );
    successMessage =
      "Post Deleted Successfully";
    res.redirect("/");
  } catch (err) {
    console.log("Error: " + err.message);
    errorCondition = "Post Doesnt Exist";
    res.redirect("/dashboard");
  }
});


app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
