# Taskflow Kanban Backend

## Day 1 + Day 2: Backend Setup and Frontend Integration

- Express server setup with CORS enabled
- MongoDB Atlas connection configured
- Mongoose models created for Users, Boards, Columns, and Tasks
- Basic REST API routes implemented
- React frontend added to the project
- Frontend connected to backend APIs using Axios
- Kanban board layout created with Todo, In Progress, and Done columns
- Tasks fetched from backend and displayed in their respective columns
- README documentation added

## Day 3: Authentication System

- Implemented JWT authentication
- User registration endpoint created
- Login system implemented
- JWT token generation on successful login
- Protected API routes using authentication middleware

## Day 4: Board Management APIs

- Implemented API endpoints to retrieve boards
- Implemented API endpoint to delete boards
- Improved backend route structure and controller logic

## Day 5: Drag-and-Drop Kanban and Code Optimization

- Implemented drag-and-drop task movement using `@hello-pangea/dnd`
- Tasks can now be moved between columns interactively
- Backend API updates column when task is moved
- Removed full page reloads when tasks are moved
- Optimized UI updates by fetching only affected columns
- Created centralized Axios API configuration (`api.js`)
- Improved frontend task management workflow