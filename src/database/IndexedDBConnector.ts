import { DatabaseConnector } from './DatabaseConnector';
import { SAMData } from './types';

/**
 * IndexedDBConnector implements DatabaseConnector using the browser's IndexedDB.
 * It provides methods to initialize the database, add, read, update, and delete SAMData entries.
 * All data is persisted in the browser and survives page reloads.
 */
export class IndexedDBConnector extends DatabaseConnector {
  private dbName = 'SAMDatabase';
  private storeName = 'SAMStore';
  private db!: IDBDatabase;

  /**
   * Initializes the IndexedDB database.
   * Creates the object store if it doesn't exist.
   * @returns Promise resolving to true if initialization succeeds, false otherwise.
   */
  async openConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'samKey' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(true);
      };

      request.onerror = () => resolve(false);
    });
  }

  /**
   * Checks if the database connection is active.
   *
   * Returns true if the IndexedDB instance is initialized.
   * Heartbeat checks are unnecessary because IndexedDB is local
   * and stays valid for the lifetime of the page/tab.
   * Only rare events like version change or tab closure can invalidate it.
   */
  async checkConnection(): Promise<boolean> {
    return this.db !== null;
  }

  /**
   * Retrieves a list of SAM metadata objects.
   * Returns only the key fields: samKey, createdAt, modifiedAt, name, and description.
   *
   * @returns Promise resolving to an array of partial SAMData objects containing only metadata.
   */
  async getSAMMetaDataList(): Promise<Partial<SAMData>[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const data = request.result as SAMData[];
        resolve(
          data.map(
            ({
              samKey,
              createdAt,
              modifiedAt,
              name,
              description,
              generationStatus,
            }) => ({
              samKey,
              createdAt,
              modifiedAt,
              name,
              description,
              generationStatus,
            })
          )
        );
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Adds a new SAM entry to the database.
   * @param samData SAMData object to add.
   * @returns Promise resolving to the generated unique key for the SAM entry.
   */
  async addSAM(samData: Partial<SAMData>): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const samKey = this.generateSamKey();
        const timestamp = Date.now();

        const transaction = this.db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const request = store.add({
          ...samData,
          samKey,
          createdAt: timestamp,
          modifiedAt: timestamp,
        });

        request.onsuccess = () => resolve(samKey);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Reads a SAM entry by its key.
   * @param samKey Unique key of the SAM entry.
   * @returns Promise resolving to the SAMData object, or null if not found.
   */
  async readSAM(samKey: string): Promise<SAMData | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(samKey);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Updates an existing SAM entry with new data.
   * @param samKey Key of the SAM entry to update.
   * @param samData New SAMData to replace the old one.
   * @returns Promise resolving to true if update succeeds, false if entry does not exist.
   */
  async updateEntireSAM(samKey: string, samData: SAMData): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const existing = await this.readSAM(samKey);
        if (!existing) return resolve(false);

        const transaction = this.db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const request = store.put({
          ...samData,
          samKey,
          modifiedAt: Date.now(),
        });

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Deletes a SAM entry from the database.
   * @param samKey Key of the SAM entry to delete.
   * @returns Promise resolving to true if deletion succeeds, false otherwise.
   */
  async dropSAM(samKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(samKey);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Closes the IndexedDB connection.
   * After calling this, the connection is no longer usable until reopened.
   * @returns Promise resolving to true if the connection was closed successfully, false otherwise.
   */
  async closeConnection(): Promise<boolean> {
    if (!this.db) return false;
    try {
      this.db.close();
      this.db = null as unknown as IDBDatabase;
      return true;
    } catch {
      return false;
    }
  }
}
