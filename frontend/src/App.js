import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(apiUrl);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(apiUrl, {
        title,
        description,
        status: "todo",
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Move task
  const moveTask = async (id, newStatus) => {
    try {
      await axios.put(`${apiUrl}/${id}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const renderColumn = (status, titleText) => (
    <div style={{ flex: 1, background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
      <h2>{titleText}</h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div
            key={task._id}
            style={{
              background: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <button onClick={() => moveTask(task._id, "todo")}>Todo</button>
            <button onClick={() => moveTask(task._id, "in-progress")}>
              In Progress
            </button>
            <button onClick={() => moveTask(task._id, "done")}>Done</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
    </div>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Taskflow Kanban</h1>

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

      <div style={{ display: "flex", gap: "20px" }}>
        {renderColumn("todo", "Todo")}
        {renderColumn("in-progress", "In Progress")}
        {renderColumn("done", "Done")}
      </div>
    </div>
  );
}

export default App;
