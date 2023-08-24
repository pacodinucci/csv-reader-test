import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

export const searchData = (req: Request, res: Response) => {
    const searchTerm = req.query.q as string;

    const dbPath = path.join(__dirname, '../../database.sqlite');    
    const db = new sqlite3.Database(dbPath);

    let query = `SELECT * FROM csv_data`;

    if (searchTerm) {
        query += `
            WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?
        `;
    }

    const searchPattern = searchTerm ? `%${searchTerm}%` : '';

    db.all(query, 
        searchTerm ? [searchPattern, searchPattern, searchPattern, searchPattern] : [], 
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Error searching data' });
            } else {
                res.json({ data: rows });
            }
        }
    );

    db.close();
};
