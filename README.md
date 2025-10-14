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
