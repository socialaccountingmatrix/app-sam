/**
 * Represents a complete Social Accounting Matrix (SAM).
 *
 * Each SAMData object is self-contained and includes:
 *  - A unique identifier (samKey)
 *  - Creation and modification timestamps (createdAt, modifiedAt)
 *  - Optional name and description of the SAM (name, description)
 *  - Optional generation status of the SAM (generationStatus)
 *  - Optional full SAM data dictionary (SAM)
 *  - Optional temporary or scratch data (SAMScratchData)
 *  - Additional flexible properties as needed
 */
export interface SAMData {
  samKey: string;
  createdAt: number;
  modifiedAt?: number;
  name?: string;
  description?: string;
  generationStatus?: 'pending' | 'completed' | 'failed';
  SAM?: { [key: string]: unknown };
  SAMScratchData?: { [key: string]: unknown };
  [key: string]: unknown;
}

/**
 * Enum representing the types of supported databases.
 */
export enum DataBaseType {
  /** Represents an IndexedDB database in the browser */
  IndexedDB = 'IndexedDB',
}
