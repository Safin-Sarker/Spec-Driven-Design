import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'agentclinic.db');

const g = globalThis as typeof globalThis & { __db?: Database.Database };

if (!g.__db) {
  g.__db = new Database(DB_PATH);
  g.__db.pragma('journal_mode = WAL');
  g.__db.pragma('foreign_keys = ON');
}

export default g.__db as Database.Database;
