import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSprite,
  setRunning,
  updateSprite,
  selectSprite,
  deleteSprite,
  setBlocks,
  clearSpriteBlock,
} from "../redux/slices/spritesSlice";
import { clearBlocks } from "../redux/slices/blocksSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const sprites = useSelector((state) => state.sprites.sprites);
  const selectedSprite = useSelector((state) => state.sprites.selectedSprite);
  const sprite = sprites.find((sprite) => sprite.id === selectedSprite);

  const isRunning = sprite?.isRunning;
  const runningRef = useRef(isRunning);

  useEffect(() => {
    if (selectedSprite && sprite) {
      dispatch(setBlocks({ id: selectedSprite, blocks: sprite.blocks }));
    }
  }, [selectedSprite, sprite, dispatch]);

  const executeBlocks = async () => {
    if (!sprite || !sprite.blocks.length || !runningRef.current) return;

    for (let i = 0; i < sprite.blocks.length; i++) {
      const block = sprite.blocks[i];
      await handleBlockExecution(block);
    }

    if (!sprite.blocks.some((block) => block.action === "repeatForever")) {
      dispatch(setRunning({ id: selectedSprite, isRunning: false }));
    }
  };

  const handleBlockExecution = async (block) => {
    switch (block.type) {
      case "motion":
        return handleMotion(block);

      case "looks":
        return handleLooks(block);

      case "control":
        return handleControl(block);

      default:
        return Promise.resolve();
    }
  };

  const handleMotion = (block) => {
    return new Promise((resolve) => {
      if (block.action === "move10Steps") {
        dispatch(
          updateSprite({ id: selectedSprite, changes: { x: sprite.x + 10 } })
        );
      } else if (block.action === "turnClockwise") {
        dispatch(
          updateSprite({
            id: selectedSprite,
            changes: { rotation: sprite.rotation + 50 },
          })
        );
      } else if (block.action === "turnAntiClockwise") {
        dispatch(
          updateSprite({
            id: selectedSprite,
            changes: { rotation: sprite.rotation - 50 },
          })
        );
      } else if (block.action === "changeXBy10") {
        dispatch(
          updateSprite({ id: selectedSprite, changes: { x: sprite.x + 10 } })
        );
      }

      setTimeout(resolve, 500);
    });
  };

  const handleLooks = (block) => {
    return new Promise((resolve) => {
      if (block.action === "sayHello") {
        dispatch(
          updateSprite({ id: selectedSprite, changes: { speech: "Hello" } })
        );
        setTimeout(() => {
          dispatch(
            updateSprite({ id: selectedSprite, changes: { speech: "" } })
          );
          resolve();
        }, 2000);
      } else if (block.action === "thinkHmm") {
        dispatch(
          updateSprite({ id: selectedSprite, changes: { speech: "Hmm..." } })
        );
        setTimeout(() => {
          dispatch(
            updateSprite({ id: selectedSprite, changes: { speech: "" } })
          );
          resolve();
        }, 2000);
      } else if (block.action === "showSprite") {
        dispatch(
          updateSprite({
            id: selectedSprite,
            changes: { hidden: false },
          })
        );
        resolve();
      } else if (block.action === "hideSprite") {
        dispatch(
          updateSprite({
            id: selectedSprite,
            changes: { hidden: true },
          })
        );
        resolve();
      } else {
        resolve();
      }
    });
  };

  const handleControl = (block) => {
    return new Promise((resolve) => {
      if (block.action === "wait3Second") {
        setTimeout(resolve, 3000);
      } else if (block.action === "repeat") {
        let times = 5;
        const repeatBlockExecution = async () => {
          for (let i = 0; i < times; i++) {
            await executeBlocks();
          }

          resolve();
        };

        repeatBlockExecution();
      } else if (block.action === "repeatForever") {
        const repeatForeverExecution = async () => {
          while (runningRef.current) {
            await executeBlocks();
          }

          resolve();
        };

        repeatForeverExecution();
      } else {
        resolve();
      }
    });
  };

  useEffect(() => {
    runningRef.current = isRunning;
    if (isRunning) {
      executeBlocks();
    }
  }, [isRunning, sprite?.blocks]);

  const handleaddSprite = () => {
    dispatch(addSprite());
  };

  const handleClear = () => {
    dispatch(clearBlocks());
    dispatch(clearSpriteBlock({ id: selectedSprite }));
  };

  const handleRun = () => {
    dispatch(setRunning({ id: selectedSprite, isRunning: true }));
  };

  const handlePause = () => {
    dispatch(setRunning({ id: selectedSprite, isRunning: false }));
  };

  const handleSelectStripe = (id) => {
    if (id !== selectedSprite) {
      dispatch(setBlocks({ id: selectedSprite, blocks: sprite.blocks }));
      dispatch(selectSprite(id));

      const selectedSpriteData = sprites.find((sprite) => sprite.id === id);
      if (selectedSpriteData) {
        dispatch(setBlocks({ id, blocks: selectedSpriteData.blocks }));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        sprite.blocks.forEach((block) => {
          if (block.action === "whenSpacePressed") {
            executeBlocks();
          }
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sprite, executeBlocks]);

  const handleDeleteSprite = (id) => {
    dispatch(deleteSprite(id));
  };

  return (
    <div className="flex justify-between p-4 bg-gray-100  border-t  border-gray-300">
      <div className="flex space-x-4">
        <button
          onClick={handleaddSprite}
          className="px-3 py-1 font-semibold bg-green-500 hover:bg-green-700 text-white rounded"
        >
          Add Sprint
        </button>
        <button
          onClick={handleRun}
          className="px-3 py-1 font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded"
        >
          Run
        </button>
        <button
          onClick={handlePause}
          className="px-3 py-1 font-semibold bg-yellow-500 hover:bg-yellow-700 text-white rounded"
        >
          Pause
        </button>
        <button
          onClick={handleClear}
          className="px-3 py-1 font-semibold bg-red-500 hover:bg-red-700 text-white rounded"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap items-center space-x-4">
        {sprites.map((sprite) => (
          <div key={sprite.id} className="relative">
            <div
              className={`cursor-pointer p-2 rounded ${
                selectedSprite === sprite.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectStripe(sprite.id)}
            >
              Sprite {sprite.id}
            </div>
            {selectedSprite === sprite.id && (
              <button
                onClick={() => handleDeleteSprite(sprite.id)}
                className="absolute -top-3 -right-2 flex items-center justify-center text-white bg-red-800 w-6 h-6 rounded-full"
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
