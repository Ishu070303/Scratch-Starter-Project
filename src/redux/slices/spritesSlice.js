import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sprites: [
    {
      id: 1,
      x: 0,
      y: 0,
      rotation: 0,
      isRunning: false,
      blocks: [],
      speech: "",
    },
  ],
  selectedSprite: 1,
  nextId: 2,
};

const spritesSlice = createSlice({
  name: "sprites",
  initialState,
  reducers: {
    addSprite(state) {
      const newSprite = {
        id: state.nextId,
        x: 0,
        y: 0,
        rotation: 0,
        isRunning: false,
        blocks: [],
        speech: "",
      };
      state.sprites.push(newSprite);
      state.selectedSprite = newSprite.id;
      state.nextId += 1;
    },

    updateSprite(state, action) {
      const { id, changes } = action.payload;
      const sprite = state.sprites.find((sprite) => sprite.id === id);
      if (sprite) {
        Object.assign(sprite, changes);
      }
    },

    setRunning(state, action) {
      const { id, isRunning } = action.payload;
      const sprite = state.sprites.find((sprite) => sprite.id === id);
      if (sprite) {
        sprite.isRunning = isRunning;
      }
    },

    selectSprite(state, action){
      state.selectedSprite = action.payload;
    },

    deleteSprite(state, action){
      const spriteId = action.payload;
      state.sprites = state.sprites.filter((sprite) => sprite.id !== spriteId);
      if(state.selectedSprite === spriteId){
        state.selectedSprite = state.sprites.length > 0 ? state.sprites[0].id : null;
      }
    },

    setBlocks(state, action){
      const { id, blocks } = action.payload;
      const sprite = state.sprites.find((sprite) => sprite.id === id);
      if(sprite){
        sprite.blocks = blocks;
      }
    },

    clearSpriteBlock(state, action) {
      const { id } = action.payload;
      const sprite = state.sprites.find((sprite) => sprite.id === id);
      if(sprite){
        sprite.blocks = [];
        sprite.speech = "";
      }
    }

  },
});

export const { addSprite, updateSprite, setRunning, selectSprite, deleteSprite, setBlocks, clearSpriteBlock } = spritesSlice.actions;
export default spritesSlice.reducer;
