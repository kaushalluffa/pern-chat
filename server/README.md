# React Chat Website - Server

Welcome to the React Chat Website! We'll be building a real-time chat application using modern web technologies. The backend server will be built with Node.js and Express, while the frontend will be developed using React, Vite, TypeScript, and Material-UI. We'll be using PostgreSQL as our database and Prisma as our ORM for seamless database interactions.

## Features

- Real-time messaging using Socket.IO
- CRUD operations for managing chat messages
- User authentication and authorization
- Responsive and user-friendly UI with Material-UI
- Type-safe development with TypeScript
- Efficient development workflow with Vite

## Getting Started

To get started , make sure you have backend setup see step 4.

## 1. **Clone the repository:**

```bash
git clone https://github.com/kaushalluffa/pern-chat-server.git

```

## 2. **Install Dependencies:**

```bash
npm install

```

## 3. **Add env file:**

 Check .env.example file for reference. To generate a secret key for jwt on your pc run the following

 ```bash
 openssl rand -base64 32

 ```

## 4. **Setup your database:**

After you add the env run the following command to migrate the database schema to your database 

```bash
npm run prisma:updateSchema

```
## 5. **Star the Server:**

```bash
npm run dev

```
## 6. **Run your frontend:**
If you haven't already setup you frontend here is the [Frontend Setup Guide](https://github.com/kaushalluffa/pern-chat-client)
