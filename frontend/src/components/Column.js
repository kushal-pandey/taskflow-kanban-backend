import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

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
          style={{
            width: "340px",
            background: "#e2e8f0",
            padding: "20px",
            borderRadius: "12px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              marginBottom: "14px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            {column.title} ({columnTasks.length})
          </h2>

          {/* Task title */}
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
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          {/* Priority dropdown */}
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
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due date */}
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
              padding: "10px",
              marginBottom: "14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          {columnTasks.length === 0 && (
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              No tasks yet
            </p>
          )}

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