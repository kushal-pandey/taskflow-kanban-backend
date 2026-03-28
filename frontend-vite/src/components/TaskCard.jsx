import { Draggable } from "@hello-pangea/dnd";
import { Trash2 } from "lucide-react";

function TaskCard({ task, index, columnId, deleteTask, setSelectedTask }) {
  const getPriorityColor = (priority) => {
    const colors = {
      High: "from-red-500 to-red-600",
      Medium: "from-yellow-500 to-yellow-600",
      Low: "from-green-500 to-green-600",
    };
    return colors[priority] || "from-gray-500 to-gray-600";
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setSelectedTask(task)}
          className={`bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer group border border-slate-600 hover:border-blue-500 ${
            snapshot.isDragging ? "shadow-xl ring-2 ring-blue-400 scale-105" : ""
          }`}
          style={provided.draggableProps.style}
        >
          {/* Title */}
          <h4 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition">
            {task.title}
          </h4>

          {/* Priority Badge */}
          <div className="flex justify-between items-start mb-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task._id, columnId);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-600 rounded text-red-400 hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className={`text-xs mb-3 p-2 rounded ${
              isOverdue
                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}>
              📅 {isOverdue ? "🚨 Overdue: " : ""}{new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {/* Task Description Preview */}
          {task.description && (
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Color Indicator */}
          <div className="flex gap-2 items-center">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: task.color || "#3b82f6" }}
            />
            <div className="text-xs text-slate-400">
              {task.tags?.length > 0 && (
                <span className="bg-slate-600 px-2 py-1 rounded">
                  {task.tags[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;