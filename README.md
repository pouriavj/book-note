# 📚 Book Note

**Book Note** is a full-stack web app where users can **sign up**, **log in**, and **share book reviews, ratings, and notes**.  
Each entry can include an **auto-generated book cover** using the BookCover API, or a **default simple cover** when that option is left unchecked.  
Users manage their posts in a personal **dashboard**, while all shared notes appear on a public home page.

---

## 📘 Description

Readers can document and organize their thoughts on books they’ve read. The app ensures smooth operation with **PostgreSQL** for secure data handling, **Axios** for API integration, and **Bootstrap + CSS** for a clean, responsive design.  
It also includes **validation**, **error handling**, **success notifications**, and options to **sort posts by rating or date** for a refined user experience.

---

## 🚀 Features

- 🔐 User authentication (Sign Up / Log In)  
- 🧾 Create, edit, and delete book notes  
- 🌆 Auto-generate or use default covers  
- ⭐ Sort posts by **Rating** or **Date**  
- ✅ Error & success notifications
- 🎨 Custom website logo designed in Canva 
- 🖥️ Modern UI built with Bootstrap + CSS 

---

## 📸 Preview

![Book Note Demo](./bookNote.gif)

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td><b>JavaScript</b></td>
    <td><b>Node.js</b></td>
  </tr>
  <tr>
    <td><b>Express.js</b></td>
    <td><b>EJS</b></td>
  </tr>
  <tr>
    <td><b>PostgreSQL</b></td>
    <td><b>Axios</b></td>
  </tr>
  <tr>
    <td><b>Bootstrap</b></td>
    <td><b>CSS</b></td>
  </tr>
</table>

---

> \[!WARNING\]
> The current login system provides a basic **first-level authentication** using in-memory variables for user sessions.  
> While it works for single users, a more secure, session-based authentication system (e.g., with Passport.js) will be implemented in a future update to support multi-user safety.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pouriavj/book-note.git
   cd book-note
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a PostgreSQL database:**
   ```sql
   CREATE DATABASE booknote;
   \c booknote

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

4. **Update connection info in `index.js`:**
   ```js
   const db = new pg.Client({
     user: "your-username-here",        // PostgreSQL username
     host: "localhost",                 // Database host (usually localhost)
     database: "booknote",              // Database name
     password: "your-password-here",    // PostgreSQL password
     port: 5432,                        // Default PostgreSQL port
   });
   ```

5. **Run the app:**
   ```bash
   node index.js
   ```

   Or for auto-reload during development:
   ```bash
   npm install -g nodemon
   nodemon index.js
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 💡 How It Works

Users log in to their dashboard, create book notes with title, author, rating, and notes, and choose whether to auto-generate a cover.  
Posts appear on the home page (filtered by login status) and can be sorted by rating or date.

---

## 🧠 Learning Highlights

- Built a **Node.js + Express + PostgreSQL** full-stack app  
- Integrated **external APIs** using Axios  
- Strengthened **error handling** and **data validation**  
- Practiced **EJS templating** and **Bootstrap styling**  

---

## ✍️ Author

[Pouria VJ](https://github.com/pouriavj)

---

## 📜 License

This project is open-source and available under the **MIT License**.
