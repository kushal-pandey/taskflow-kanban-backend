import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, columnId, deleteTask, setSelectedTask }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-3 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          style={provided.draggableProps.style}
          onClick={() => setSelectedTask(task)}
        >
          <h4 className="font-semibold text-gray-800 mb-2">
            {task.title}
          </h4>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded
              ${
                task.priority === "High"
                  ? "bg-red-200 text-red-800"
                  : task.priority === "Low"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }
            `}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <p className="text-xs text-gray-500 mt-2">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task._id, columnId);
            }}
            className="mt-3 text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;