import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard.jsx";

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

  return (
    <Droppable droppableId={column._id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-80 bg-gray-200 p-4 rounded-xl shadow-sm"
        >
          {/* Column Title */}
          <h2 className="text-lg font-bold mb-3 text-gray-700">
            {column.title} ({columnTasks.length})
          </h2>

          {/* Task Input */}
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
            className="w-full p-2 mb-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Priority */}
          <select
            value={newPriority[column._id] || "Medium"}
            onChange={(e) =>
              setNewPriority({
                ...newPriority,
                [column._id]: e.target.value,
              })
            }
            className="w-full p-2 mb-2 rounded-lg border"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
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
            className="w-full p-2 mb-3 rounded-lg border"
          />

          {/* Empty State */}
          {columnTasks.length === 0 && (
            <p className="text-sm text-gray-500">No tasks yet</p>
          )}

          {/* Tasks */}
          {columnTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              columnId={column._id}
              deleteTask={deleteTask}
              setSelectedTask={setSelectedTask}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;