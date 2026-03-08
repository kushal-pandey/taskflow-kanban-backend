import { useEffect, useState } from "react";
import api from "./api";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const boardId = "69ad24d636933946e2cd4420";

function App() {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});

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
  }, []);

  const addTask = async (columnId, title) => {
    if (!title) return;

    try {
      await api.post("/tasks", {
        title,
        description: "",
        column: columnId,
      });

      fetchTasks(columnId);
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId;
    const destColumn = result.destination.droppableId;

    if (sourceColumn === destColumn) return;

    const task = tasks[sourceColumn][result.source.index];

    moveTask(task._id, sourceColumn, destColumn);
  };

  return (
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTask(column._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
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
                          <h4>{task.title}</h4>

                          <button
                            onClick={() =>
                              deleteTask(task._id, column._id)
                            }
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
    </div>
  );
}

export default App;