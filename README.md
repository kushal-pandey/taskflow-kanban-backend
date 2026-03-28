# TaskFlow Kanban 🚀

A modern, feature-rich **Kanban board application** built with React, Node.js, and MongoDB Atlas. Manage your tasks efficiently with drag-and-drop functionality, analytics, notes, stickers, and beautiful UI.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

---

## ✨ Features

### 🎯 Core Features
- ✅ **Drag & Drop Kanban Board** - Move tasks between columns seamlessly
- ✅ **User Authentication** - Secure JWT-based login & registration
- ✅ **Task Management** - Create, edit, delete tasks with priority levels
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Task Colors** - Customize task colors from 7 beautiful gradients
- ✅ **Descriptions** - Add detailed task descriptions

### 📝 Sticky Notes & Stickers
- ✅ **Sticky Notes** - Add multiple notes to tasks (5 colors: Yellow, Pink, Blue, Green, Purple)
- ✅ **Emojis/Stickers** - Add fun emojis to tasks (10+ emoji options)
- ✅ **Rich Editing** - Edit and delete notes/stickers anytime

### 📊 Analytics & Dashboard
- ✅ **Statistics Dashboard** - View total boards, tasks, columns at a glance
- ✅ **Charts & Graphs** - Priority distribution pie chart, tasks by column bar chart
- ✅ **Overdue Tasks Alert** - Track tasks past their due date
- ✅ **Priority Summary** - Quick overview of high, medium, and low priority tasks

### 🎨 UI/UX
- ✅ **Modern Dark Theme** - Beautiful gradient backgrounds and smooth animations
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Real-time Updates** - Instant task updates across the board
- ✅ **Glass Morphism Effects** - Modern frosted glass design
- ✅ **Smooth Animations** - Polished transitions and interactions

---

## 🛠 Tech Stack

### **Frontend**
- **React 19** - UI framework
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Recharts 2** - Charts and graphs
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **@hello-pangea/dnd** - Drag and drop library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Dotenv** - Environment management

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **npm 8+** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)

---

## 🚀 Installation & Setup

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/taskflow-kanban.git
cd taskflow-kanban
```

### **Step 2: Setup MongoDB Atlas**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user and get your connection string
4. Your URI will look like: `mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority`

### **Step 3: Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
```

**Note:** Replace `your_username`, `your_password`, and `cluster` with your actual MongoDB Atlas credentials.

### **Step 4: Setup Frontend**
```bash
cd ../frontend-vite
npm install
```

The frontend will automatically connect to `http://localhost:5000/api`

---

## 🏃 Running the Project

### **Terminal 1: Start Backend Server**
```bash
cd backend
npm start
```
✅ You should see:
```
[dotenv] injecting env from .env
Server running on port 5000
MongoDB connected
```

### **Terminal 2: Start Frontend Development Server**
```bash
cd frontend-vite
npm run dev
```
✅ You should see:
```
VITE v8.0.1 ready in 307 ms
➜ Local: http://localhost:5174/
```

### **Terminal 3 (Optional): View API Logs**
The backend terminal will show all API requests and database operations.

### **Step 5: Open in Browser**
Navigate to: **http://localhost:5174**

---

## 📱 How to Use

### **1. Register & Login**
- Click **"Register"** on the login page
- Enter your email and password (min 6 characters)
- Confirm password and complete registration
- Login with your credentials

### **2. Create Tasks**
- Type task name in the input field
- Select priority: 🟢 Low, 🟡 Medium, or 🔴 High
- Pick a due date (optional)
- Press **Enter** to create

### **3. Manage Tasks**
- **Click** a task to open detailed editor
- **Edit** title, description, due date, and color
- **Add Notes** - Create sticky notes in 5 colors
- **Add Stickers** - Choose from 10+ emojis
- **Drag & Drop** - Move tasks between columns
- **Delete** - Click the delete icon

### **4. View Analytics**
- Click **"Dashboard"** button in navbar
- View statistics cards (Total Boards, Tasks, Due Today, Overdue)
- Select a board to see:
  - Priority distribution pie chart
  - Tasks by column bar chart
  - Priority summary
  - Overdue tasks alert

### **5. Logout**
- Click **"Logout"** in the top-right corner
- You'll be returned to the login page

---

## 📁 Project Structure

```
taskflow-kanban/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── boardController.js    # Board operations
│   │   ├── columnController.js   # Column operations
│   │   ├── noteController.js     # Note operations
│   │   ├── stickerController.js  # Sticker operations
│   │   └── analyticsController.js# Analytics logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Board.js              # Board schema
│   │   ├── Column.js             # Column schema
│   │   ├── Task.js               # Task schema
│   │   ├── Note.js               # Note schema
│   │   └── Sticker.js            # Sticker schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── boardRoutes.js        # Board endpoints
│   │   ├── columnRoutes.js       # Column endpoints
│   │   ├── taskRoutes.js         # Task endpoints
│   │   ├── noteRoutes.js         # Note endpoints
│   │   ├── stickerRoutes.js      # Sticker endpoints
│   │   └── analyticsRoutes.js    # Analytics endpoints
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express app entry point
│
└── frontend-vite/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Column.jsx         # Column component
    │   │   ├── TaskCard.jsx       # Task card component
    │   │   ├── TaskModal.jsx      # Task editor modal
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   └── Modal.jsx          # Reusable modal
    │   ├── api.js                 # Axios instance
    │   ├── App.jsx                # Main app component
    │   ├── Board.jsx              # Kanban board view
    │   ├── Dashboard.jsx          # Analytics dashboard
    │   ├── Login.jsx              # Login page
    │   ├── Register.jsx           # Register page
    │   ├── App.css                # Global styles
    │   ├── index.css              # Tailwind imports
    │   └── main.jsx               # React entry point
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── index.html
```

---

## 🔌 API Endpoints

### **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### **Boards**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/boards` | Get all user boards |
| POST | `/api/boards` | Create new board |
| DELETE | `/api/boards/:id` | Delete board |

### **Columns**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/columns/:boardId` | Get board columns |
| POST | `/api/columns` | Create column |
| PUT | `/api/columns/:id` | Update column |
| DELETE | `/api/columns/:id` | Delete column |

### **Tasks**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/:columnId` | Get column tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### **Notes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes/:taskId` | Get task notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

### **Stickers**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stickers/:taskId` | Get task stickers |
| POST | `/api/stickers` | Create sticker |
| DELETE | `/api/stickers/:id` | Delete sticker |

### **Analytics**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/board/:boardId` | Get board analytics |
| GET | `/api/analytics/dashboard/stats` | Get dashboard statistics |

---

## 🔐 Environment Variables

### **Backend (.env)**
```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### **Frontend (Automatic)**
Frontend automatically connects to `http://localhost:5000/api`
- To change, edit `src/api.js`

---

## 🚀 Build for Production

### **Frontend**
```bash
cd frontend-vite
npm run build
npm run preview
```

### **Backend Deployment**
For production deployment on services like Heroku, Railway, or AWS:
1. Set environment variables on the hosting platform
2. Update `MONGO_URI` to your production database
3. Use `npm start` to run the server

---

## 🐛 Troubleshooting

### **"MongoDB connected" not showing**
- ✅ Check `.env` file has correct `MONGO_URI`
- ✅ Verify MongoDB Atlas cluster is running
- ✅ Check your IP is whitelisted in MongoDB Atlas

### **CORS errors in console**
- ✅ Backend is running on port 5000
- ✅ Frontend is making requests to `http://localhost:5000/api`
- ✅ Check backend `server.js` has `cors()` enabled

### **Port already in use**
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr ":5000"
taskkill /PID <PID> /F

# Kill process on port 5174 (frontend)
netstat -ano | findstr ":5174"
taskkill /PID <PID> /F
```

### **npm install fails**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### **Tasks not appearing**
- ✅ Make sure you've created a board first (auto-created with default columns)
- ✅ Check browser console for errors (F12)
- ✅ Verify backend is running and connected to MongoDB

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

Created with ❤️ by Kushal Pandey

For questions or support, feel free to open an issue on GitHub.

---

## 🙏 Acknowledgments

- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [Recharts](https://recharts.org) - Charts library
- [Lucide React](https://lucide.dev) - Icons

---

## 📞 Support

If you encounter any issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the backend terminal for error messages
3. Check browser console (F12) for frontend errors
4. Open an issue on GitHub with error details

---

**Happy Task Managing! 🎉**
