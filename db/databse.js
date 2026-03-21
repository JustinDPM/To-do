import { app } from 'electron';
import path from 'node:path';
import Database from 'better-sqlite3';

class appDatabase {
    constructor(){
        const dbPath = path.join(app.getPath('userData'), 'to-do.sqlite');
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL')
        this.setUpDataBase()
    }

    setUpDataBase(){
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0
            )
            `)
        console.log("db initialized!")
        }
        
}

export default appDatabase