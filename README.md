# Todo List API

A RESTful API for managing todo tasks built with TypeScript, Express, and MongoDB.

## Features

- User authentication (register, login)
- Create, read, update, and delete todo items
- Mark todos as complete/incomplete
- Set due dates for tasks
- Scheduled tasks using cron jobs

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Language**: TypeScript
- **Other tools**: node-cron for scheduled tasks

## Project Structure

```
src/
├── bin/                  # Server startup
├── config/               # Database configuration
├── controller/           # Request handlers
├── middleware/           # Express middleware
├── model/                # Mongoose models
├── routes/               # API routes
├── service/              # Business logic
├── utils/                # Helper functions and interfaces
└── app.ts                # Express app setup
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd Todo_List
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the src directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todo_list
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /v1/user` - Register a new user
- `POST /v1/login` - Login and get JWT token

### Todo Items
- `GET /v1/todo` - Get all todos for the authenticated user
- `POST /v1/todo` - Create a new todo
- `GET /v1/todo/:id` - Get a specific todo
- `PUT /v1/todo/:id` - Update a todo
- `DELETE /v1/todo/:id` - Delete a todo

### User Management
- `GET /v1/user/:id` - Get user profile
- `PUT /v1/user/:id` - Update user profile
- `DELETE /v1/user/:id` - Delete user profile
- `GET /v1/user` - Get all users