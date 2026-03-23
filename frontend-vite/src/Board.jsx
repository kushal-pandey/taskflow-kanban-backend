import { useEffect, useState } from "react";
import api from "./api.js";
import Column from "./components/Column.jsx";
import Navbar from "./components/Navbar.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import Modal from "./components/Modal.jsx";

const Board = ({ setIsLoggedIn }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTitle, setNewTitle] = useState({});
  const [newPriority, setNewPriority] = useState({});
  const [newDueDate, setNewDueDate] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const fetchTasks = async (columnId) => {
    const res = await api.get(`/tasks/${columnId}`);
    setTasks((prev) => ({
      ...prev,
      [columnId]: res.data,
    }));
  };

  const fetchBoard = async () => {
    const boardRes = await api.get("/boards");
    const board = boardRes.data[0];

    const colRes = await api.get(`/columns/${board._id}`);
    setColumns(colRes.data);

    colRes.data.forEach((col) => fetchTasks(col._id));
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const addTask = async (columnId, title, priority, dueDate) => {
    if (!title.trim()) return;

    await api.post("/tasks", {
      title,
      column: columnId,
      priority,
      dueDate,
    });

    fetchTasks(columnId);
  };

  const deleteTask = async (taskId, columnId) => {
    await api.delete(`/tasks/${taskId}`);
    fetchTasks(columnId);
  };

  const updateTask = async () => {
    try {
      await api.put(`/tasks/${selectedTask._id}`, {
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
      });

      fetchBoard();
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newColumnId = result.destination.droppableId;

    await api.put(`/tasks/${taskId}`, {
      column: newColumnId,
    });

    fetchBoard();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          TaskFlow Kanban
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto">
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
      </div>
      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
          placeholder="Description"
        />

        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setSelectedTask(null)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={updateTask}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Board;
