import { useEffect, useState } from "react";
import api from "./api.js";
import Column from "./components/Column.jsx";
import Navbar from "./components/Navbar.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import Modal from "./components/Modal.jsx";
import TaskModal from "./components/TaskModal.jsx";

const Board = ({ setIsLoggedIn, setCurrentView }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTitle, setNewTitle] = useState({});
  const [newPriority, setNewPriority] = useState({});
  const [newDueDate, setNewDueDate] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editColor, setEditColor] = useState("");
  const [notes, setNotes] = useState([]);
  const [stickers, setStickers] = useState([]);

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
        color: editColor,
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

  const openTaskDetails = async (task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");
    setEditColor(task.color || "#3b82f6");

    try {
      const notesRes = await api.get(`/notes/${task._id}`);
      const stickersRes = await api.get(`/stickers/${task._id}`);
      setNotes(notesRes.data);
      setStickers(stickersRes.data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar setIsLoggedIn={setIsLoggedIn} setCurrentView={setCurrentView} />

      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TaskFlow Kanban
        </h1>
        <p className="text-slate-400 mb-8">Manage your tasks with elegant drag and drop</p>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
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
                setSelectedTask={openTaskDetails}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      <TaskModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        editColor={editColor}
        setEditColor={setEditColor}
        onUpdate={updateTask}
        notes={notes}
        stickers={stickers}
        setNotes={setNotes}
        setStickers={setStickers}
      />
    </div>
  );
};

export default Board;
