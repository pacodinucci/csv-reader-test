import { Request, Response } from 'express';
import multer from 'multer';
import { saveCsvData } from '../database/database';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const fileUpload = upload.single('file')

export const processUploadedFile = (req: Request, res: Response) => {
    const uploadedFile = req.file;
    
    if (!uploadedFile) {
        return res.status(400).json({ error: 'You must upload a file' });
    }

    const fileExtension = uploadedFile.originalname.split('.').pop();
    if (fileExtension !== 'csv') {
        return res.status(400).json({ error: 'Uploaded file must be a CSV' });
    }

    try {
        const csvData = uploadedFile.buffer.toString('utf-8');
        const lines = csvData.split('\n');
        
        saveCsvData(lines);

        res.json({ message: 'CSV file successfully uploaded and data inserted into database' });
    } catch (error) {
        res.status(500).json({ error: 'Error to process CSV file' });
    }
};

