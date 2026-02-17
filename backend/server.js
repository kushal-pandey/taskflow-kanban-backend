require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");





const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Learn React",
      description: "Understand useState and useEffect",
      status: "Todo"
    },
    {
      _id: "2",
      title: "Build Kanban",
      description: "Create task board UI",
      status: "In Progress"
    }
  ]);
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
