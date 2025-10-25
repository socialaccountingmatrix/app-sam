/**
 * Async thunks for loading and saving the currently edited Social Accounting Matrix (SAM) data.
 *
 * - `loadSAM`: loads a SAM entry from the database by its key.
 * - `saveSAM`: updates an existing SAM entry in the database.
 *
 * These thunks handle opening and closing the database connection
 * and throw errors if the requested SAM entry does not exist.
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SAMData, DataBaseType } from '../../types';
import { DatabaseFactory } from '../../database/DatabaseFactory';

/**
 * Load a SAM entry by its key from the database.
 * Throws an error if the SAM entry does not exist.
 */
export const loadSAM = createAsyncThunk<SAMData, string>(
  'currentSAM/loadSAM',
  async (samKey) => {
    const db = DatabaseFactory.createDatabase(DataBaseType.IndexedDB);
    await db.openConnection();
    const sam = await db.readSAM(samKey);
    await db.closeConnection();
    if (!sam) {
      throw new Error(`SAM with key ${samKey} not found`);
    }

    return sam;
  }
);

/**
 * Update an existing SAM entry in the database.
 * Throws an error if the SAM entry does not exist.
 */
export const saveSAM = createAsyncThunk<
  SAMData,
  Partial<SAMData> & { samKey: string }
>('currentSAM/saveSAM', async ({ samKey, ...samUpdate }) => {
  const db = DatabaseFactory.createDatabase(DataBaseType.IndexedDB);
  await db.openConnection();

  const existingSAM = await db.readSAM(samKey);
  if (!existingSAM) {
    await db.closeConnection();
    throw new Error(`SAM with key ${samKey} not found`);
  }

  const updatedSAM: SAMData = {
    ...existingSAM,
    ...samUpdate,
    modifiedAt: Date.now(),
  };

  await db.updateEntireSAM(samKey, updatedSAM);
  await db.closeConnection();

  return updatedSAM;
});
