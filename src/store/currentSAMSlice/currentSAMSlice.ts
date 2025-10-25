/**
 * Redux slice for managing the currently editable Social Acccounting Matrix.
 *
 * State includes:
 * - `currentSAMData`: the currently selected SAM data or `null`.
 * - `loading`: boolean indicating if an async operation is in progress.
 * - `error`: string containing any error message from async operations.
 *
 * Reducers:
 * - `updateSAM`: synchronous in-memory update of the current SAM data.
 *
 * Extra reducers handle async thunks:
 * - `loadSAM`: loads SAM data from the database.
 * - `saveSAM`: saves/updates SAM data to the database.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SAMData } from '../../types';
import { loadSAM, saveSAM } from './thunks';

interface CurrentSAMState {
  currentSAMData: SAMData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentSAMState = {
  currentSAMData: null,
  loading: false,
  error: null,
};

const currentSAMSlice = createSlice({
  name: 'currentSAM',
  initialState,
  reducers: {
    updateSAM(state, action: PayloadAction<SAMData>) {
      state.currentSAMData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSAM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSAM.fulfilled, (state, action: PayloadAction<SAMData>) => {
        state.loading = false;
        state.currentSAMData = action.payload;
      })
      .addCase(loadSAM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load SAM';
      });

    builder
      .addCase(saveSAM.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveSAM.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveSAM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update SAM';
      });
  },
});

export const { updateSAM } = currentSAMSlice.actions;
export default currentSAMSlice.reducer;
