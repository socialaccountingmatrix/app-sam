/**
 * Redux slice for managing the list of Social Accounting Matrix (SAM) metadata.
 *
 * State includes:
 * - `samMetaDataList`: an array of SAM metadata entries.
 * - `loading`: boolean indicating if an async operation is in progress.
 * - `error`: string containing any error message from async operations.
 *
 * Extra reducers handle async thunks:
 * - `fetchSAMList`: fetches the list of SAM entries from the database.
 * - `createSAM`: creates a new SAM entry in database.
 * - `dropSAM`: removes a SAM entry from the database.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SAMData } from '../../types';
import { fetchSAMList, createSAM, dropSAM } from './thunks';

interface SAMMetaDataListState {
  samMetaDataList: Partial<SAMData>[];
  loading: boolean;
  error: string | null;
}

const initialState: SAMMetaDataListState = {
  samMetaDataList: [],
  loading: false,
  error: null,
};

const samMetaDataListSlice = createSlice({
  name: 'samMetaDataList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH SAM LIST
    builder
      .addCase(fetchSAMList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSAMList.fulfilled,
        (state, action: PayloadAction<Partial<SAMData>[]>) => {
          state.loading = false;
          state.samMetaDataList = action.payload;
        }
      )
      .addCase(fetchSAMList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch SAM list';
      });

    // CREATE SAM
    builder
      .addCase(createSAM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSAM.fulfilled,
        (state, action: PayloadAction<Partial<SAMData>>) => {
          state.loading = false;
          state.samMetaDataList.push(action.payload);
        }
      )
      .addCase(createSAM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create SAM';
      });

    // DROP SAM
    builder
      .addCase(dropSAM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dropSAM.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.samMetaDataList = state.samMetaDataList.filter(
          (sam) => sam.samKey !== action.payload
        );
      })
      .addCase(dropSAM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to drop SAM';
      });
  },
});

export default samMetaDataListSlice.reducer;
