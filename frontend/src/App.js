import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks
  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/tasks", {
        title,
        description,
        status: "todo",
      })
      .then(() => {
        setTitle("");
        setDescription("");
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Taskflow Kanban</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Task</button>
      </form>

      {/* KANBAN BOARD */}
      <div style={{ display: "flex", gap: "20px" }}>

        {/* TODO COLUMN */}
        <div style={{ flex: 1, background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <h2>Todo</h2>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div key={task._id} style={{ background: "white", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>

        {/* IN PROGRESS COLUMN */}
        <div style={{ flex: 1, background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <h2>In Progress</h2>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <div key={task._id} style={{ background: "white", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>

        {/* DONE COLUMN */}
        <div style={{ flex: 1, background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <h2>Done</h2>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div key={task._id} style={{ background: "white", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default App;
