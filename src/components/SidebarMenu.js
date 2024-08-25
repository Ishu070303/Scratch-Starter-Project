import React from "react";

const categories = [
  { name: "Event", color: "bg-yellow-400" },
  { name: "Motion", color: "bg-blue-400" },
  { name: "Looks", color: "bg-purple-400" },
  { name: "Control", color: "bg-red-400" },
];

const SidebarMenu = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {categories.map((category, index) => (
        <div
          onClick={() => onSelectCategory(category.name)}
          key={index}
          className={`flex flex-col items-center justify-center m-2 py-2 px-2 rounded cursor-pointer ${
            selectedCategory === category.name ? "bg-gray-100" : ""
          }`}
        >
          <div className={`w-4 h-4 rounded-full mr-2 ${category.color}`}></div>
          <span className="text-black text-sm font-medium">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
