import { useState } from "react";
import api from "../api";
import { X, Trash2, Plus } from "lucide-react";

const TaskModal = ({
  isOpen,
  onClose,
  task,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editDueDate,
  setEditDueDate,
  editColor,
  setEditColor,
  onUpdate,
  notes,
  stickers,
  setNotes,
  setStickers,
}) => {
  const [newNote, setNewNote] = useState("");
  const [noteColor, setNoteColor] = useState("yellow");
  const [selectedEmoji, setSelectedEmoji] = useState("😊");

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#4f46e5", "#8b5cf6"];
  const NOTE_COLORS = ["yellow", "pink", "blue", "green", "purple"];
  const EMOJIS = ["😊", "❤️", "🎯", "✨", "🚀", "⭐", "🔥", "💯", "🎉", "👍"];

  if (!isOpen || !task) return null;

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      await api.post("/notes", {
        content: newNote,
        taskId: task._id,
        color: noteColor,
      });

      const res = await api.get(`/notes/${task._id}`);
      setNotes(res.data);
      setNewNote("");
      setNoteColor("yellow");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      const res = await api.get(`/notes/${task._id}`);
      setNotes(res.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const addSticker = async () => {
    try {
      await api.post("/stickers", {
        emoji: selectedEmoji,
        taskId: task._id,
      });

      const res = await api.get(`/stickers/${task._id}`);
      setStickers(res.data);
    } catch (error) {
      console.error("Error adding sticker:", error);
    }
  };

  const deleteSticker = async (stickerId) => {
    try {
      await api.delete(`/stickers/${stickerId}`);
      const res = await api.get(`/stickers/${task._id}`);
      setStickers(res.data);
    } catch (error) {
      console.error("Error deleting sticker:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-white">Task Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">
              Task Title
            </label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none h-20"
              placeholder="Add task description..."
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">
              Due Date
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">
              Task Color
            </label>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setEditColor(color)}
                  className={`w-8 h-8 rounded-full transition ${
                    editColor === color ? "ring-2 ring-white scale-110" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Stickers */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              ✨ Stickers ({stickers.length})
            </h3>

            {stickers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {stickers.map((sticker) => (
                  <div
                    key={sticker._id}
                    className="flex items-center gap-2 bg-slate-700 px-2 py-1 rounded-lg group cursor-pointer"
                  >
                    <span className="text-lg">{sticker.emoji}</span>
                    <button
                      onClick={() => deleteSticker(sticker._id)}
                      className="hidden group-hover:block text-red-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <select
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none text-lg"
              >
                {EMOJIS.map((emoji) => (
                  <option key={emoji} value={emoji}>
                    {emoji}
                  </option>
                ))}
              </select>
              <button
                onClick={addSticker}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition font-medium"
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              📝 Notes ({notes.length})
            </h3>

            {notes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={() => deleteNote(note._id)}
                  />
                ))}
              </div>
            )}

            <div className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none h-16"
              />
              <div className="flex gap-2 items-end">
                <div className="flex gap-2">
                  {NOTE_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNoteColor(color)}
                      className={`w-6 h-6 rounded transition ${
                        noteColor === color ? "ring-2 ring-white scale-110" : ""
                      }`}
                      style={{
                        backgroundColor:
                          color === "yellow"
                            ? "#fcd34d"
                            : color === "pink"
                            ? "#f472b6"
                            : color === "blue"
                            ? "#60a5fa"
                            : color === "green"
                            ? "#4ade80"
                            : "#c084fc",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={addNote}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition font-medium ml-auto"
                >
                  <Plus size={18} /> Add Note
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onUpdate}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoteCard = ({ note, onDelete }) => {
  const colorMap = {
    yellow: "#fef08a",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    green: "#bbf7d0",
    purple: "#e9d5ff",
  };

  return (
    <div
      style={{ backgroundColor: colorMap[note.color] }}
      className="p-3 rounded-lg relative group hover:shadow-lg transition"
    >
      <p className="text-sm text-gray-800 break-words pr-6">{note.content}</p>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-300 rounded"
      >
        <X size={16} />
      </button>
      <span className="text-xs text-gray-600 mt-1 block">
        {new Date(note.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default TaskModal;
