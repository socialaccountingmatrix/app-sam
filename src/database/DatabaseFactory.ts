import { DatabaseConnector } from './DatabaseConnector';
import { IndexedDBConnector } from './IndexedDBConnector';
import { DataBaseType } from './types';

/** Creates database connectors based on DataBaseType */
export class DatabaseFactory {
  private static connectors: Record<DataBaseType, new () => DatabaseConnector> =
    {
      [DataBaseType.IndexedDB]: IndexedDBConnector,
    };

  static createDatabase(type: DataBaseType): DatabaseConnector {
    const Connector = this.connectors[type];
    if (!Connector) throw new Error(`Unknown DB type: ${type}`);
    return new Connector();
  }
}
