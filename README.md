# Task-Taker-2.0 📝

Task-Taker-2.0 is a modern web application designed to help you manage your tasks efficiently. It utilizes React with Vite in the frontend, Zustand for state management, Express.js as the backend framework, 🐘 Postgres as the database with Prisma as the ORM, and Typescript for both frontend and backend development. It also implements secure authentication using email credentials login with 🔐 JSON Web Tokens (JWT).

## Features

- **Efficient Task Management**: Organize your tasks effectively with Task-Taker-2.0. Create, update, and delete tasks seamlessly.
- **Secure Authentication**: Safely login to your account using email credentials. Task-Taker-2.0 employs JSON Web Tokens (JWT) for secure authentication.
- **Responsive User Interface**: Enjoy a smooth user experience across various devices with Task-Taker-2.0's responsive design.

## Installation

To run Task-Taker-2.0 locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/CN-M/Task-Taker-2.0.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Task-Taker-2.0
   ```

3. Install dependencies for both the backend and frontend:

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

4. Rename `.env.example` to `.env` and fill in the necessary environment variables:

   ```bash
   mv .env.example .env
   ```

5. Start the development servers:

   ```bash
   npm run dev
   ```

6. Access Task-Taker-2.0 in your browser:

   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:3000

## Backend Overview

The backend of Task-Taker-2.0 is built using Express.js. It provides RESTful API endpoints for tasks and user authentication.

### Endpoints

- **GET /account/login**: Login endpoint for users.
- **POST /account/register**: Register endpoint for new users.
- **GET /**: Get all tasks for the authenticated user.
- **POST /**: Create a new task for the authenticated user.
- **PUT /:id**: Update a task with the specified ID.
- **DELETE /:id**: Delete a task with the specified ID.

## Frontend Overview

The frontend of Task-Taker-2.0 is developed using React with Vite. Zustand is used for state management, providing a seamless user experience.

### Routes

The client-side routing in Task-Taker-2.0 allows users to navigate between different pages seamlessly. Here are the available routes and the corresponding pages:

- **Dashboard (/)**: The dashboard page displays the user's tasks and provides options to create, update, and delete tasks.
- **Login (/login)**: The login page allows users to authenticate themselves by entering their email and password.
- **Register (/register)**: The register page enables new users to create an account by providing their personal information and choosing a password.

With these routes, users can easily navigate through the application, manage their tasks, and interact with the authentication system to access their accounts.

### Folder Structure

```
Task-Taker-2.0/
├── client/                 # Frontend code
│   ├── public/             # Public assets
│   └── src/                # Source files
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components for different routes
│       ├── App.css         # Global CSS styles
│       ├── App.tsx         # Main component rendering routes
│       └── main.tsx       # Entry point for the React application
├── dist/                   # Compiled backend code
├── server/                 # Backend code
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── routes/             # Route definitions
│   ├── config/             # Configuration files
│   └── server.ts              # Express app entry point
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

```

## Contributors

- [CN-M](https://github.com/CN-M)
