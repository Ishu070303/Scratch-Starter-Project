import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import DraggableBlock from "./DraggableBlock";
import { useDrop } from "react-dnd";
import { setBlocks } from "../redux/slices/spritesSlice";


const MidArea = () => {
  const dispatch = useDispatch();
  const selectedSprite = useSelector((state) => state.sprites.selectedSprite);
  const sprites = useSelector((state) => state.sprites.sprites);
  const sprite = sprites.find((sprite) => sprite.id === selectedSprite);

  const [{isOver}, drop ] = useDrop({
    accept: 'block',
    drop: (item) => {
      if(sprite){
        const updatedBlocks = [...sprite.blocks, item];
        dispatch(setBlocks({ id: selectedSprite, blocks: updatedBlocks}));
      }
    },
    collect: (monitor) => ({isOver: !!monitor.isOver()}),
  });

  const containerHeight = Math.max(256, sprite?.blocks.length * 50);

  return(
    <div className="flex-1 h-full overflow-auto p-4 border border-gray-300 flex items-center justify-center">
      <div ref={drop} className={`w-64 h-64 p-4 border-2 border-gray-400 rounded ${isOver ? "bg-gray-200" : "bg-gray-100"} `} style={{ height: `${containerHeight}px`}}>
      <h2 className="text-center font-medium text-sm">{`Drop Actions Here!`}</h2>
        {
          sprite?.blocks?.map((block, index) => (
            <DraggableBlock key={index} block={block} disabled={true} />
          ))
        }
      </div>
    </div>
  )
};

export default MidArea;