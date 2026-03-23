import React, { useEffect, useState } from "react";
import api from "../api";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";

const Board = () => {
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const boardRes = await api.get("/boards");

    const board = boardRes.data[0];

    const colRes = await api.get(`/columns/${board._id}`);

    const columnsWithTasks = await Promise.all(
      colRes.data.map(async (col) => {
        const taskRes = await api.get(`/tasks/${col._id}`);
        return { ...col, tasks: taskRes.data };
      }),
    );

    setColumns(columnsWithTasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newColumnId = over.id;

    try {
      const token = localStorage.getItem("token");

      await api.put(`/tasks/${taskId}`, { column: newColumnId });

      fetchData();
    } catch (error) {
      console.log("Drag error:", error);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => (
          <Column key={col._id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
