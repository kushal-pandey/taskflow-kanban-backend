import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard.jsx";
import { Plus } from "lucide-react";

function Column({
  column,
  tasks,
  newTitle,
  setNewTitle,
  newPriority,
  setNewPriority,
  newDueDate,
  setNewDueDate,
  addTask,
  deleteTask,
  setSelectedTask,
}) {
  const columnTasks = tasks[column._id] || [];

  const getColumnColor = () => {
    const colors = {
      "Todo": "from-blue-600 to-blue-700",
      "In Progress": "from-yellow-600 to-yellow-700",
      "Done": "from-green-600 to-green-700",
    };
    return colors[column.title] || "from-slate-600 to-slate-700";
  };

  return (
    <Droppable droppableId={column._id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-96 flex-shrink-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-lg border transition-all duration-200 ${
            snapshot.isDraggingOver
              ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105"
              : "border-slate-700"
          }`}
        >
          {/* Column Header */}
          <div className={`bg-gradient-to-r ${getColumnColor()} p-4 rounded-t-xl`}>
            <h2 className="text-lg font-bold text-white">
              {column.title}
              <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                {columnTasks.length}
              </span>
            </h2>
          </div>

          <div className="p-4 space-y-3">
            {/* Task Input */}
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
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

                    setNewDueDate({
                      ...newDueDate,
                      [column._id]: "",
                    });

                    setNewPriority({
                      ...newPriority,
                      [column._id]: "Medium",
                    });
                  }
                }}
                className="w-full p-2 mb-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              />

              {/* Priority Selector */}
              <select
                value={newPriority[column._id] || "Medium"}
                onChange={(e) =>
                  setNewPriority({
                    ...newPriority,
                    [column._id]: e.target.value,
                  })
                }
                className="w-full p-2 mb-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>

              {/* Due Date */}
              <input
                type="date"
                value={newDueDate[column._id] || ""}
                onChange={(e) =>
                  setNewDueDate({
                    ...newDueDate,
                    [column._id]: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Tasks Container */}
            <div className="space-y-2 min-h-[200px]">
              {columnTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-slate-500">
                  <Plus size={32} className="opacity-50 mb-2" />
                  <p className="text-sm">No tasks yet</p>
                </div>
              ) : (
                columnTasks.map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    columnId={column._id}
                    deleteTask={deleteTask}
                    setSelectedTask={setSelectedTask}
                  />
                ))
              )}

              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;