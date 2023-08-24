import { Router } from 'express';
import  { processUploadedFile, fileUpload } from '../controllers/uploadFile';
import { searchData } from '../controllers/searchData';

const router = Router();

router.post('/api/files', fileUpload, processUploadedFile);

router.get('/api/users', searchData);

export default router;