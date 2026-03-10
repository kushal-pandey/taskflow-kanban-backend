# TaskFlow Kanban

TaskFlow is a **full-stack Kanban task management application** built using **React, Node.js, Express, and MongoDB**.

The application allows users to manage tasks across different workflow stages using an interactive **drag-and-drop Kanban board**, similar to tools like Trello or Jira.

This project demonstrates key full-stack concepts including **authentication, REST APIs, database design, and frontend state management**.

---

# Features

### Authentication

* User registration
* Secure login using JWT authentication
* Password hashing with bcrypt
* Protected backend API routes
* Persistent login using localStorage

### Kanban Board

* Three workflow stages:

  * Todo
  * In Progress
  * Done
* Drag-and-drop task movement between columns
* Automatic backend updates when tasks change columns

### Task Management

* Create tasks
* Edit task title and description
* Delete tasks
* Tasks dynamically fetched from backend APIs

### User Interface

* React-based frontend
* Task editing modal
* Navbar with logout functionality
* Basic form validation

---

# Tech Stack

### Frontend

* React
* Axios (API communication)
* @hello-pangea/dnd (Drag and Drop functionality)

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt password hashing
* CORS middleware

### Database

* MongoDB Atlas
* Mongoose ODM

---

# Setup Instructions

## Clone the repository

```bash
git clone https://github.com/kushal-pandey/taskflow-kanban.git
cd taskflow-kanban
```

---

## Backend Setup

```bash
cd backend
npm install
```

This installs backend dependencies such as:

* express
* mongoose
* cors
* jsonwebtoken
* bcrypt

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

This installs frontend dependencies including:

* axios
* @hello-pangea/dnd

Application URLs:

```
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

---

# Future Improvements

* Task priority labels
* Due dates
* Multiple boards per user
* Task search and filtering
* Toast notifications
* UI improvements and responsive design
* Deployment using Vercel and Render

---

# Author

Kushal Pandey
