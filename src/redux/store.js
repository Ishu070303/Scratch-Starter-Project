import { configureStore } from "@reduxjs/toolkit";
import  blocksReducer from './slices/blocksSlice';
import spritesReducer from './slices/spritesSlice';

export const store = configureStore({
    reducer: {
        blocks: blocksReducer,
        sprites: spritesReducer
    }
})