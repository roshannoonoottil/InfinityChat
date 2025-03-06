import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
