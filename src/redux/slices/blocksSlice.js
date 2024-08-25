import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blocks: [],
};

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      const { type, action: blockAction, label } = action.payload;
      state.blocks.push({ type, action: blockAction, label });
    },

    clearBlocks(state) {
      state.blocks = [];
    },
  },
});

export const { addBlock, clearBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
