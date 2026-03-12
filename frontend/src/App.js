import { useEffect, useState } from "react";
import api from "./api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Login from "./Login";
import Navbar from "./Navbar";

const boardId = "69ad24d636933946e2cd4420";

function App() {
  const [newTitle, setNewTitle] = useState({});
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [editDueDate, setEditDueDate] = useState("");
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

    const fetchColumns = async () => {
      try {
        const res = await api.get(`/columns/${boardId}`);

        setColumns(res.data);

        res.data.forEach((column) => {
          fetchTasks(column._id);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchColumns();
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

  const moveTask = async (taskId, oldColumnId, newColumnId) => {
    try {
      await api.put(`/tasks/${taskId}`, {
        column: newColumnId,
      });

      fetchTasks(oldColumnId);
      fetchTasks(newColumnId);
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

    if (sourceColumn === destColumn) return;

    const task = tasks[sourceColumn][result.source.index];

    moveTask(task._id, sourceColumn, destColumn);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>TaskFlow Kanban</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", gap: "20px" }}>
            {columns.map((column) => (
              <Droppable droppableId={column._id} key={column._id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      flex: 1,
                      background: "#f1f5f9",
                      padding: "15px",
                      borderRadius: "8px",
                      minHeight: "300px",
                    }}
                  >
                    <h2>{column.title}</h2>

                    <input
                      placeholder="New task..."
                      value={newTitle[column._id] || ""}
                      onChange={(e) =>
                        setNewTitle({
                          ...newTitle,
                          [column._id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const title = newTitle[column._id];
                          const priority = newPriority[column._id] || "Medium";
                          const dueDate = newDueDate[column._id] || null;

                          addTask(column._id, title, priority, dueDate);

                          setNewTitle({
                            ...newTitle,
                            [column._id]: "",
                          });
                        }
                      }}
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginBottom: "6px",
                      }}
                    />

                    <select
                      value={newPriority[column._id] || "Medium"}
                      onChange={(e) =>
                        setNewPriority({
                          ...newPriority,
                          [column._id]: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>

                    <input
                      type="date"
                      value={newDueDate[column._id] || ""}
                      onChange={(e) =>
                        setNewDueDate({
                          ...newDueDate,
                          [column._id]: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginBottom: "10px",
                      }}
                    />

                    {(tasks[column._id] || []).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: "white",
                              padding: "10px",
                              marginBottom: "10px",
                              borderRadius: "6px",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <h4
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setSelectedTask(task);
                                setEditTitle(task.title);
                                setEditDescription(task.description || "");
                                setEditDueDate(
                                  task.dueDate
                                    ? task.dueDate.substring(0, 10)
                                    : "",
                                );
                              }}
                            >
                              {task.title}
                            </h4>

                            <p
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginBottom: "6px",
                                color:
                                  task.priority === "High"
                                    ? "red"
                                    : task.priority === "Low"
                                      ? "green"
                                      : "orange",
                              }}
                            >
                              Priority: {task.priority || "Medium"}
                            </p>

                            {task.dueDate && (
                              <p style={{ fontSize: "12px", color: "gray" }}>
                                Due:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </p>
                            )}

                            <button
                              onClick={() => deleteTask(task._id, column._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {selectedTask && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "300px",
              }}
            >
              <h3>Edit Task</h3>

              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <button onClick={updateTask}>Save</button>

              <button
                onClick={() => {
                  setSelectedTask(null);
                  setEditDueDate("");
                }}
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
