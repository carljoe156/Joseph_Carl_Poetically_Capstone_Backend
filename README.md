# Poetically Book Website Application- Backend

### FRONTEND GitHub Repository - (https://github.com/carljoe156/Joseph_Carl_Poetically_Capstone_Frontend.git)

## Overview

This application is a MERN (MongoDB, Express, React, Node.js) stack project designed for Books Enthusiasts, The main application is a general purpose Book Exploration searching platform, you can also discover Mindfulness and Wellness blog inspired posts, the secondary application users can perform CRUD (Create, Read, Update, Delete) operations on books, finding books through a built in User Generated Book Recommender, where you can access a curated lists. Maybe you'll fine a book you Like or Love!.

### Book Recommender

#### Be mindful of others when using this feature.

### Uses Backend frameworks such as Node, Express and MongoDB for interacting via CRUD functionalities. These of which are highlighted below.

- **Create Book**: Add a new book with details like title, genre, author, year, pages, and publisher.
- **Read Book**: View details of a specific book.
- **Update Book**: Edit book details.
- **Delete Book**: Remove a book from the list.

## Technologies Used

### Backend

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.

### Development Tools

- **Postman**: For testing API endpoints.
- **ESLint**: For code quality and linting.
- **Prettier**: For consistent code formatting.

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
2. Open the application in your browser at:
   - Backend: `http://localhost:5000`
