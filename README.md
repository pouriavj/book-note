# Book Note

Book Note is a web application where users can sign up, log in, and share their personal reviews, ratings, and notes on different books. Each post can include an automatically generated book cover fetched from an external API, making every entry unique and visually appealing. Users can manage all their posts in a private dashboard, while the public home page displays posts from everyone in the community.

---

## 🧠 Description

Book Note allows readers to easily document and share their thoughts on books they’ve read. When creating a post, users can either upload their own book cover or check the **auto-generate** option — the app will automatically fetch a cover using the title and author via the [BookCover API](https://bookcover.longitood.com/bookcover).  
It uses **PostgreSQL** to store user accounts and posts securely, with strong validation and detailed error handling for incorrect or duplicate data. The app also includes **success notifications**, a **rating and date sorting system**, and smooth user experience design powered by **Bootstrap 5** and **custom CSS**.  

The site adapts dynamically — logged-in users see only their own posts on the home page (without usernames), while visitors see posts from all users with usernames and ratings visible.  

---

## 🚀 Features

- 🔐 Secure authentication (Sign Up / Log In)
- 🧾 Create, edit, or delete your book notes in a dashboard  
- 🌆 Auto-generate book covers via API  
- 💬 View all users’ posts or just your own when logged in  
- ⭐ Sort posts by **rating** or **date**  
- ✅ Success and error notifications  
- 🖋️ Responsive layout built with **Bootstrap + custom CSS**  
- 🧱 Default book cover when auto-cover is disabled  

---

## 🛠️ Tech Stack

| Technology     | Use |
|----------------|-----|
| Node.js        | Backend runtime |
| Express.js     | Web framework for routing |
| PostgreSQL     | Database for storing users and posts |
| EJS            | Server-side templating |
| Axios          | Fetching auto-generated book covers from API |
| Bootstrap 5    | Layout and responsive styling |
| Custom CSS     | Additional UI design and animations |

---

## 💡 How It Works

1. Users sign up or log in to access their personal dashboard.  
2. They can create a new book note with **title**, **author**, **rating**, and **notes**.  
3. Checking the **auto-generate cover** option fetches a matching image from the API.  
4. Posts appear on the home page — either all users’ posts or only the user’s own, depending on login status.  
5. Posts can be sorted by rating or date for easier browsing.  

---

## 📸 Preview

_(You can include screenshots or a short GIF of your app running here)_

---

## 🧑‍💻 Author

Developed with ❤️ by **Pouria**  

---

## 🪪 License

This project is open-source and available under the **MIT License**.
