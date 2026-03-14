import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, columnId, deleteTask, setSelectedTask }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: "white",
            padding: "16px",
            marginBottom: "14px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer",
            ...provided.draggableProps.style,
          }}
          onClick={() => setSelectedTask(task)}
        >
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {task.title}
          </h4>

          <span
            style={{
              fontSize: "12px",
              fontWeight: "600",
              padding: "5px 10px",
              borderRadius: "6px",
              background:
                task.priority === "High"
                  ? "#fecaca"
                  : task.priority === "Low"
                  ? "#bbf7d0"
                  : "#fde68a",
            }}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "6px",
              }}
            >
              Due {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task._id, columnId);
            }}
            style={{
              marginTop: "10px",
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;