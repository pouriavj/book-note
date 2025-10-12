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

let posts = [
  {
    cover: "",
    title: "Cosmos",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: "1",
    username: "Me",
  },
  {
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388620656i/55030.jpg",
    title: "Cosmos",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: "1",
    username: "Me",
  },
  {
    cover: "",
    title: "Cosmos",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: "1",
    username: "Me",
  },
];

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    success: successMessage,
    user: userAuth,
    posts: posts,
  });
  successMessage = false;
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
  
    res.render("dashboard.ejs", { posts: result.rows, error: errorCondition });
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

  if (req.body.autoCover === "yes") {
    try {
      const response = await axios.get(
        `${API_URL}?book_title=${req.body.title}&author_name=${req.body.author}`
      );
      console.log(response.data.url);
      coverUrl = response.data.url;

      try {
        await db.query(
          "INSERT INTO posts (title, author, notes, rating, cover, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
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
          "INSERT INTO posts (title, author, notes, rating, cover, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
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
  if (req.body.autoCover === "yes") {
    try {
      const response = await axios.get(
        `${API_URL}?book_title=${req.body.title}&author_name=${req.body.author}`
      );
      console.log(response.data.url);
      coverUrl = response.data.url;

      try {
        await db.query(
          "UPDATE posts SET title = $1, author = $2 , notes = $3, rating = $4, cover = $5, user_id = $6",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
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
          "UPDATE posts SET title = $1, author = $2 , notes = $3, rating = $4, cover = $5, user_id = $6",
          [
            req.body.title,
            req.body.author,
            req.body.notes,
            req.body.rating,
            coverUrl,
            userId,
          ]
        );
        successMessage = "Your book Updated successfully";
        res.redirect("/");
      } catch (error) {
        console.log("Error: " + error.message);
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
