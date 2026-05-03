import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'agentclinic.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(readFileSync(SCHEMA_PATH, 'utf-8'));

console.log('Migration complete:', DB_PATH);
db.close();
