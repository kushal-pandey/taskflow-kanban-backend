import { useEffect, useState } from "react";
import api from "./api";
import { DragDropContext } from "@hello-pangea/dnd";
import Login from "./Login";
import Navbar from "./Navbar";
import Column from "./components/Column";

function App() {
  const [newTitle, setNewTitle] = useState({});
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [newPriority, setNewPriority] = useState({});
  const [newDueDate, setNewDueDate] = useState({});

  const fetchTasks = async (columnId) => {
    try {
      const res = await api.get(`/tasks/${columnId}`);

      setTasks((prev) => ({
        ...prev,
        [columnId]: res.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadBoard = async () => {
      try {
        const boardRes = await api.get("/boards");
        const board = boardRes.data[0];

        if (!board) return;

        const columnRes = await api.get(`/columns/${board._id}`);
        setColumns(columnRes.data);

        columnRes.data.forEach((column) => {
          fetchTasks(column._id);
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadBoard();
  }, [isLoggedIn]);

  const addTask = async (
    columnId,
    title,
    priority = "Medium",
    dueDate = null,
  ) => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", {
        title,
        description: "",
        column: columnId,
        priority,
        dueDate,
      });

      fetchTasks(columnId);

      setNewPriority({
        ...newPriority,
        [columnId]: "Medium",
      });

      setNewDueDate({
        ...newDueDate,
        [columnId]: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId, columnId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks(columnId);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async () => {
    try {
      await api.put(`/tasks/${selectedTask._id}`, {
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
      });

      fetchTasks(selectedTask.column);
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId;
    const destColumn = result.destination.droppableId;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destTasks =
      sourceColumn === destColumn ? sourceTasks : Array.from(tasks[destColumn]);

    const [movedTask] = sourceTasks.splice(sourceIndex, 1);
    destTasks.splice(destIndex, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: sourceTasks,
      [destColumn]: destTasks,
    }));

    if (sourceColumn !== destColumn) {
      api.put(`/tasks/${movedTask._id}`, {
        column: destColumn,
      });
    }

    api.put(`/tasks/${movedTask._id}`, {
      order: destIndex,
    });
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div
        style={{
          padding: "30px",
          fontFamily: "Inter, sans-serif",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
          TaskFlow Kanban
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
          >
            {columns.map((column) => (
              <Column
                key={column._id}
                column={column}
                tasks={tasks}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newPriority={newPriority}
                setNewPriority={setNewPriority}
                newDueDate={newDueDate}
                setNewDueDate={setNewDueDate}
                addTask={addTask}
                deleteTask={deleteTask}
                setSelectedTask={(task) => {
                  setSelectedTask(task);
                  setEditTitle(task.title);
                  setEditDescription(task.description || "");
                  setEditDueDate(
                    task.dueDate ? task.dueDate.substring(0, 10) : "",
                  );
                }}
              />
            ))}
          </div>
        </DragDropContext>

        {selectedTask && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                width: "340px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>Edit Task</h3>

              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              />

              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                style={{ width: "100%", marginBottom: "15px", padding: "8px" }}
              />

              <button onClick={updateTask}>Save</button>

              <button
                onClick={() => setSelectedTask(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
