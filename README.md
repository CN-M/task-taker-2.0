# Task Taker 2.0

Task Taker 2.0 is a comprehensive Todo List application allowing users to manage their tasks efficiently. Users can register, log in, and manage tasks by creating, deleting, and marking them as complete.

### Dashboard
![Dashboard](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/dashboard.bmp)

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

### Login Page
![Login Page](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/login.bmp)

### Register Page
![Register Page](https://github.com/CN-M/task-taker-2.0/blob/main/screenshots/register.bmp)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Any package manager, i.e. **pnpm**, **npm**, or **yarn**. I use pnpm in my local environment, and I use it in this README, but any package manager should work.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CN-M/Task-Taker-2.0.git
   cd Task-Taker-2.0
   ```

2. **Install dependencies for the client, server, and root directory:**
   ```bash
   pnpm install
   cd client
   pnpm install
   cd ../server
   pnpm install
   ```

3. **Setup environment variables:**

   **Server:**
   Create a `.env` file in the root of the `server` directory and add the following variables (Make sure you fill in the missing stuff):
   > Hint: Use the CLI command `openssl rand -base64 32` to generate random secrets for `SECRET` and `REFFRESH_SECRET`.
   ```env
   PORT="3000"
   SECRET="your-secret"
   REFRESH_SECRET="your-refresh-secret"
   NODE_ENV="development"
   CLIENT_ROOT_URL="http://localhost:5173"
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

   - By default, the project uses PostgreSQL as a database and so asks for a PostgreSQL database URL.
   - If you need a quick Postrgres database you can spin up an instance on [Neon](https://neon.tech) or [Railway](https://railway.app/).

   - Alternatively, you can adjust the `server/prisma/schema.prisma` file to your preferred database and it should work about the same when given a database url. (I haven't tested this though so let's hope it doesn't break)

   **Client:**
   Create a `.env` file in the root of the `client` directory and add the following variables:
   ```env
   VITE_ENV="development"
   VITE_BACKEND_URL="http://localhost:3000"
   ```

4. **Run Prisma migrations and Seed Guest User:**
   ```bash
   cd server
   pnpm prisma migrate dev
   cd ..
   pnpm seed
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