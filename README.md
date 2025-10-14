# Book Note

Book Note is a platform where users can sign up, log in, and share their reviews, ratings, and notes on different books. Users can create, edit, or delete notes from the dashboard, and optionally auto-generate book covers using an external API. The site displays all users’ posts on the home page, and when logged in, users see only their own posts. The website uses Bootstrap with custom CSS for a clean, modern, and user-friendly design.

---

## Features

- Sign up and log in to manage your book notes.
- Create, edit, and delete posts in your dashboard.
- Auto-generate book covers by providing the title and author.
- Display posts from all users on the home page, with ratings and notes.
- Sort posts by rating or date.
- Success and error notifications for better UX.
- Responsive and visually appealing design using Bootstrap + custom CSS.

---

## Tech Stack

| Technology       | Purpose                                           |
|-----------------|---------------------------------------------------|
| Node.js         | Backend server                                   |
| Express.js      | Routing and server framework                      |
| PostgreSQL      | Database for users and posts                      |
| Axios           | Fetch book cover images from external API        |
| EJS             | Server-side templating                            |
| Bootstrap 5     | Responsive design and layout                      |
| Custom CSS      | Custom styling and design enhancements           |

---

## How It Works

1. Users sign up or log in to access the dashboard.
2. On the dashboard, they can add a book note with title, author, rating, and personal notes.
3. If the auto-generate cover option is selected, the website fetches a book cover from the API based on the title and author.
4. Users can edit or delete their posts at any time.
5. On the home page, all posts are displayed with ratings, notes, and the author’s name. Logged-in users see only their posts.
6. Posts can be sorted by rating or date for easy navigation.
