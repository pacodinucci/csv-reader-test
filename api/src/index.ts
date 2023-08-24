import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status(status).send(message);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
