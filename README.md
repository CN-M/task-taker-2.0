# Task Taker 2.0

Task Taker 2.0 is a comprehensive Todo List application allowing users to manage their tasks efficiently. Users can register, log in, and manage tasks by creating, deleting, and marking them as complete.

## Features

- **User Authentication:** Register, Login, Logout
- **Task Management:** Create, View, Delete, Mark as Complete
- **Protected Routes:** Secure routes with JWT access tokens
- **Token Refresh:** Automatic refresh of expired tokens

## Tech Stack

### Frontend

- **Framework:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Library:** React
- **State Management:** Zustand
- **Form Validation:** Zod

### Backend

- **Framework:** Node.js, Express
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Bcrypt for password hashing, JWT for tokens
- **Validation:** Zod

## Screenshots

### Dashboard
![Dashboard](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/dashboard.png)

### Login Page
![Login Page](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/login.png)

### Register Page
![Register Page](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/register.png)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **pnpm:** Make sure pnpm is installed globally.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CN-M/Task-Taker-2.0.git
   cd Task-Taker-2.0
   ```

2. **Install dependencies for both client and server:**
   ```bash
   cd client
   pnpm install
   cd ../server
   pnpm install
   ```

3. **Setup environment variables:**

   **Server:**
   Create a `.env` file in the root directory of the server and add the following variables:
   ```env
   PORT="3000"
   SECRET="your-secret"
   REFFRESH_SECRET="your-refresh-secret"
   NODE_ENV="development"
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

   **Client:**
   Create a `.env` file in the root directory of the client and add the following variables:
   ```env
   VITE_ENV="development"
   VITE_BACKEND_URL="http://localhost:3000"
   ```

   > Use `openssl rand -base64 32` to generate random `SECRET` and `REFFRESH_SECRET`.

4. **Run Prisma migrations:**
   ```bash
   cd server
   pnpm prisma migrate dev
   ```

### Running the Application

You can run the application using the following scripts from the root of the project:


- **Start Client:**
  ```bash
  pnpm client
  ```

- **Start Server:**
  ```bash
  pnpm server
  ```

- **Run Both Client and Server in Development Mode:**
  ```bash
  pnpm dev
  ```

- **Preview Build:**
  ```bash
  pnpm preview
  ```

### Default Ports

- **Backend:** `http://localhost:3000`
- **Frontend:** `http://localhost:5173`

### Folder Structure

```
├── README.md
├── client
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── package.json
├── pnpm-lock.yaml
├── prompt.txt
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── package.json
    ├── pnpm-lock.yaml
    ├── prisma
    ├── routes
    ├── server.ts
    └── tsconfig.json
```

### Pages

- **Login:** `/login`
- **Register:** `/register`
- **Dashboard:** `/`

## Repository

[GitHub Repository](https://github.com/CN-M/Task-Taker-2.0.git)

## Author

CN-M

---

This README provides a detailed overview of the Task Taker 2.0 project, including setup instructions, features, tech stack, and scripts to manage the project.