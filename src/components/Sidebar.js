import React, { useState } from "react";
import { useDrag } from "react-dnd";
import SidebarMenu from "../components/SidebarMenu";

const actions = {
  Event: [
    { action: "whenSpacePressed", label: "When Space key Pressed" },
  ],

  Motion: [
    { action: "move10Steps", label: "Move 10 Steps" },
    { action: "turnClockwise", label: "Turn clockwise 50 Degree" },
    { action: "turnAntiClockwise", label: "Turn anticlockwise 50 Degree" },
    { action: "changeXBy10", label: "Change X by 10" },
  ],

  Looks: [
    { action: "sayHello", label: "Say Hello for 2 seconds" },
    { action: "thinkHmm", label: "Think Hmm for 2 seconds " },
  ],

  Control: [
    { action: "wait3Second", label: "should wait for 3 seconds" },
  ],
};

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Event");
  return (
    <div className="w-80 h-full flex justify-around border-2 border-gray-300">
      <div className="">
        {" "}
        <SidebarMenu
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="border-l-2 border-gray-300  h-full flex flex-col gap-2 p-2">
        <div className="font-bold"> {selectedCategory} </div>
        {actions[selectedCategory].map((action, index) => (
          <DraggableSidebarItems
            key={index}
            type={selectedCategory.toLowerCase()}
            action={action.action}
            label={action.label}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableSidebarItems = ({ type, action, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: { type, action, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const blockColor =
    type === "motion"
      ? "bg-blue-400"
      : type === "control"
      ? "bg-red-400"
      : type === "looks"
      ? "bg-purple-400"
      : "bg-yellow-400";

  return (
    <div
      ref={drag}
      className={`bg-gray-200 w-[400px] text-center px-2 py-1 rounded-md my-2 text-white font-medium text-sm cursor-grab ${blockColor} ${
        isDragging ? "opacity-20 cursor-grabbing" : "opacity-100"
      }`}
    >
      {label}
    </div>
  );
};

export default Sidebar;
