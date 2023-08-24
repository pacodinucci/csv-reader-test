import sqlite3 from 'sqlite3';

export function saveCsvData(lines: string[]): void {
    const db = new sqlite3.Database('database.sqlite');

    db.run(`
        CREATE TABLE IF NOT EXISTS csv_data (
            id INTEGER PRIMARY KEY,
            name TEXT,
            city TEXT,
            country TEXT,
            favorite_sport TEXT
        );
    `);

    db.serialize(() => {
        const stmt = db.prepare(`
            INSERT INTO csv_data (name, city, country, favorite_sport)
            VALUES (?, ?, ?, ?);
        `);

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const cleanValues = values.map(value => value.trim());
            stmt.run(cleanValues);
        }

        stmt.finalize(); 
    });

    db.close(); 
}