import { SAMData } from './types';

/**
 * Abstract base class for all database connectors.
 * 
 * Provides a standard interface for interacting with SAMData storage,
 * including initialization, connection checking, CRUD operations, 
 * and key generation. 
 * 
 * Child classes should implement all abstract methods to handle 
 * the specifics of their respective database systems.
 * 
 * Methods:
 *  - openConnection(): Initialize the database connection.
 *  - checkConnection(): Check if the database connection is alive.
 *  - getSAMMetaDataList(): Retrieve a list of SAM metadata (subset of SAMData).
 *  - addSAMToList(SAMData): Add a SAMData item and return a generated primary key.
 *  - readSAM(samKey): Read a SAMData item by its primary key.
 *  - updateEntireSAM(samKey, samData): Update a SAMData item completely.
 *  - dropSAM(samKey): Delete a SAMData item by its primary key.
 *  - closeConnection(): Closes the database connection.
 * 
 * Protected Helpers:
 *  - generateSamKey(): Generates a unique random primary key for SAMData items.
 */

export abstract class DatabaseConnector {
  abstract openConnection(): Promise<boolean>;
  abstract checkConnection(): Promise<boolean>;
  abstract getSAMMetaDataList(): Promise<Partial<SAMData>[]>;
  abstract addSAMToList(samData: SAMData): Promise<string>;
  abstract readSAM(samKey: string): Promise<SAMData | null>;
  abstract updateEntireSAM(samKey: string, samData: SAMData): Promise<boolean>;
  abstract dropSAM(samKey: string): Promise<boolean>;
  abstract closeConnection(): Promise<boolean>;

  protected generateSamKey(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
