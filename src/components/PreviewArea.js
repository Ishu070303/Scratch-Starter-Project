import React from "react";
import CatSprite from "./CatSprite";
import { useSelector } from "react-redux";

const PreviewArea = () => {
  const sprites = useSelector((state) => state.sprites.sprites, (prev, next) => prev.length === next.length && prev.every((sprite, index) => sprite.id  === next[index].id ));
  return(
    <div className="w-1/3 h-full overflow-hidden p-2 border-1 border-gray-200">
      {sprites.map((sprite) => (
        <CatSprite  key={sprite.id} id={sprite.id} />
      ))}
    </div>
  )
}

export default PreviewArea;
