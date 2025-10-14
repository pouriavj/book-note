# 📚 Book Note

**Book Note** is a web application where users can **sign up**, **log in**, and **share their personal reviews, ratings, and notes** on different books.  
Each post can include an **automatically generated book cover** fetched from an external API, making every entry visually engaging.  
Users manage their posts in a private **dashboard**, while the public home page displays book notes from all members of the community.

---

## 🧠 Description

**Book Note** lets readers easily document and share their reflections on books they’ve read.  
When creating a post, users can check the **Auto-Generate Cover** option — the app will automatically fetch a book cover using the **title** and **author** via the [BookCover API](https://bookcover.longitood.com/bookcover).  
If the user leaves this option **unchecked**, the site will display a **default, simple book cover** (with no specific title or author) for that post instead.

The app uses **PostgreSQL** to store user accounts and book notes securely, with **strong validation** and **detailed error handling** for incorrect or duplicate entries.  
It also includes **success notifications**, a **sorting system** by rating or date, and a clean, responsive design built with **Bootstrap 5** and **CSS**.  

Logged-in users can manage and view their own posts, while visitors can explore all shared book notes with each author’s name, rating, and review.

---

## 🚀 Features

- 🔐 Secure authentication (**Sign Up / Log In**)  
- 🧾 Create, edit, and delete book notes from your **dashboard**  
- 🌆 **Auto-generate book covers** or use a **default cover**  
- 💬 Public feed shows all users’ posts  
- ⭐ Sort posts by **Rating** or **Date**  
- ✅ Clear success and error notifications  
- 🎨 Modern UI built with **Bootstrap 5 + CSS**  


---

## 📸 Preview

![Book Note Demo](./bookNote.gif)

---

## 🛠️ Tech Stack

| Technology     | Use |
|----------------|-----|
| **Node.js**        | Backend runtime |
| **Express.js**     | Web framework for routing |
| **PostgreSQL**     | Database for storing users and posts |
| **EJS**            | Server-side templating engine |
| **Axios**          | Fetching auto-generated book covers from API |
| **Bootstrap 5**    | Layout and responsive styling |
| **CSS**            | Custom design and visual effects |

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pouriavj/book-note.git
   cd permalist
   ```
2. **Install dependencies:**
   ```bash
   npm install

   ```
3. **Create a PostgreSQL database:**
   ```sql
   	CREATE DATABASE booknote;
      	\c booknote
   
   	-- Create SQL Tables --
   	CREATE TABLE register(
		id SERIAL PRIMARY KEY,
		username VARCHAR(20) UNIQUE NOT NULL CHECK (length(btrim(username)) > 0),
		password VARCHAR(15) NOT NULL CHECK (length(btrim(password)) > 0)
		);
   
   	CREATE TABLE posts(
		id SERIAL PRIMARY KEY,
		title VARCHAR(80) NOT NULL CHECK (length(btrim(title)) > 0),
		author VARCHAR(50) NOT NULL CHECK (length(btrim(author)) > 0),
		notes TEXT NOT NULL CHECK (length(btrim(notes)) > 0),
		rating TEXT NOT NULL,
		cover TEXT,
		user_id INT NOT NULL REFERENCES register(id),
		created_at TEXT,
		UNIQUE (title, author, user_id)
   		);
   	```
4. **Update connection info in index.js:**
   ```js
    const db = new pg.Client({
     user: "your-username-here",        // PostgreSQL username
     host: "localhost",                 // Database host (usually localhost)
     database: "booknote",             // Database name
     password: "your-password-here",    // PostgreSQL password
     port: 5432,                        // Database port (default PostgreSQL port)
   });

   ```
5. **Run the app:**
   ```bash
   node index.js

   ```
   or, for automatic reloads during development:
   ```bash
   npm install -g nodemon
   nodemon index.js
   ```
6. **Visit the app:**
   ```bash
   http://localhost:3000

   ```

---

## 💡 How It Works

1. Users **sign up or log in** to access their personal dashboard.  
2. They can create a new **book note** with a title, author, rating, and personal notes.  
3. Checking **Auto-Generate Cover** fetches a matching image from the BookCover API.  
4. Leaving it unchecked applies the **default cover**.  
5. Posts appear on the home page — filtered by **login status**.  
6. Users can **sort posts** by rating or date for easier browsing.

---



## 🧑‍💻 Author

Developed with ❤️ by **Pouria**

---

## 🪪 License

This project is open-source and available under the **MIT License**.
