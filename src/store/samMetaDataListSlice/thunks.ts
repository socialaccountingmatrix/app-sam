/**
 * Async thunks for managing the Social Accounting Matrix (SAM) metadata list.
 *
 * - `fetchSAMList`: fetches all SAM metadata entries from the database.
 * - `createSAM`: creates a new SAM entry and adds it to the database.
 * - `dropSAM`: removes a SAM entry from the database by its key.
 *
 * These thunks handle opening and closing the database connection
 * and throw errors if the requested operations fail.
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SAMData, DataBaseType } from '../../types';
import { DatabaseFactory } from '../../database/DatabaseFactory';

/**
 * Fetch all SAM metadata entries from the database.
 */
export const fetchSAMList = createAsyncThunk<Partial<SAMData>[]>(
  'samMetaDataList/fetchSAMList',
  async () => {
    const db = DatabaseFactory.createDatabase(DataBaseType.IndexedDB);
    await db.openConnection();

    const list = await db.getSAMMetaDataList();

    await db.closeConnection();

    return list;
  }
);

/**
 * Create a new SAM entry in the database.
 */
export const createSAM = createAsyncThunk<Partial<SAMData>, SAMData>(
  'samMetaDataList/createSAM',
  async (newSAM) => {
    const db = DatabaseFactory.createDatabase(DataBaseType.IndexedDB);
    await db.openConnection();
    const samKey = await db.addSAM(newSAM);
    const sam = await db.readSAM(samKey);
    await db.closeConnection();
    return sam;
  }
);

/**
 * Delete a SAM entry from the database by its key.
 */
export const dropSAM = createAsyncThunk<string, string>(
  'samMetaDataList/dropSAM',
  async (samKey) => {
    const db = DatabaseFactory.createDatabase(DataBaseType.IndexedDB);
    await db.openConnection();

    const success = await db.dropSAM(samKey);

    await db.closeConnection();

    if (!success) {
      throw new Error(`Failed to delete SAM with key ${samKey}`);
    }

    return samKey;
  }
);
