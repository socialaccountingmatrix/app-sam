import { configureStore } from '@reduxjs/toolkit';
import samMetaDataListReducer from './samMetaDataListSlice/samMetaDataListSlice';
import currentSAMReducer from './currentSAMSlice/currentSAMSlice';

/**
 * Redux store configuration for the application.
 *
 * This store combines multiple slice reducers:
 * - `samMetaDataList`: manages the list of SAM metadata.
 * - `currentSAM`: manages the currently selected SAM item.
 *
 * The store also exports TypeScript types:
 * - `RootState`: type of the entire Redux state.
 * - `AppDispatch`: type of the Redux dispatch function.
 */
export const store = configureStore({
  reducer: {
    samMetaDataList: samMetaDataListReducer,
    currentSAM: currentSAMReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
