import React from "react";
import { useDrag } from "react-dnd";

const DraggableBlock = ({ block }) => {
  console.log(block);
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: block,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const blockColor =
    block.type === "motion"
      ? "bg-blue-400"
      : block.type === "control"
      ? "bg-red-400"
      : block.type === "looks"
      ? "bg-purple-400"
      : "bg-yellow-400";

  return (
    <div
      ref={drag}
      className={`bg-gray-200 px-2 py-1 my-2 text-white rounded-md text-center font-medium text-sm ${blockColor} ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {block.label}
    </div>
  );
};

export default DraggableBlock;
