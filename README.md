# Poetically Book Website Application- Backend

## Overview

This application is a MERN (MongoDB, Express, React, Node.js) stack project designed for Books Enthusiasts, The main application is a general purpose Book Exploration searching platform, you can also discover Mindfulness and Wellness blog inspired posts, the secondary application users can perform CRUD (Create, Read, Update, Delete) operations on books, finding books through a built in User Generated Book Recommender, where you can access a curated lists. Maybe you'll fine a book you Like or Love!.

## Features

### General Features

- Book Exploration Website
- Blog posts about Wellness and Mindfulness.
- Book Recommender
- Responsive user interface.
- Navigation bar and footer for seamless user experience.
- Dark mode toggle for user accessibility.
- Error handling with visual feedback using `notistack`.

### Book Exploration Website

- **Find Books**: Search for books by categories, genres, authors, or keywords.
- **Detailed View**: Click on a book to see its detailed information, including description, categories, and page count with links to offical publishers.

### Book Recommender

#### Be mindful of others when using this feature.

- **Create Book**: Add a new book with details like title, genre, author, year, pages, and publisher.
- **Read Book**: View details of a specific book.
- **Update Book**: Edit book details.
- **Delete Book**: Remove a book from the list.

### Additional Features

- **Discover Page**: Wellness and Mindfullness Blog Posts.
- **About Page**: Learn about Poetically Mission and Vision.
- **Dark Mode**: Switch between light and dark themes for user comfort.

## Technologies Used

### Frontend

- **React**: Component-based user interface.
- **React Router**: For managing routes.
- **Axios**: For making API calls to our backend.
- **Notistack**: For displaying notifications.
- **Tailwind CSS**: For styling the application
- **React-Icons**: For rendering react styles.

### Backend

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.

### Development Tools

- **Postman**: For testing API endpoints.
- **ESLint**: For code quality and linting.
- **Prettier**: For consistent code formatting.

## Frontend Folder Structure

```
src/
|--- components/
|   |-- (Books)Home/
|   |-- Layout/
|   |-- Poem/
|   |-- Nav.jsx
|   |-- Footer.jsx
|   |-- Spinner.jsx
|   |-- BackButton.jsx
|
|-- pages/
|   |-- Blog/
|   |-- Home.jsx
|   |-- BookList.jsx
|   |-- CreateBook.jsx
|   |-- ShowBook.jsx
|   |-- UpdateBook.jsx
|   |-- DeleteBook.jsx
|   |-- CreatePost.jsx
|   |-- Discover.jsx
|   |-- About.jsx
|
|-- App.jsx
|-- App.css
|-- index.js
```

## API Endpoints HTTP Methods/CRUD Methods

### Books

- `GET /api/v1/books`: Fetch all books
- `GET /api/v1/book/:id`: Fetch details of a specific book.
- `POST /api/v1/books`: Add a new book.
- `PUT /api/v1/book/:id`: Update book details.
- `DELETE /api/v1/book/:id`: Remove a book.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   nodemon index.js
   ```
2. Start the frontend application:
   ```bash
   npm run dev
   ```
3. Open the application in your browser at:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## Future Enhancements

- Accessibility standard UI/UX design.
- Implementation of third-party libraries and APIs.
- User accounts and administrative services for personalized experiences.
- Advanced book recommendation engine with AI-driven insights.

## License

This project is licensed under the MIT License.
