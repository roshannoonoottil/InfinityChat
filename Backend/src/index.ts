import express from 'express';
import authRoutes from './routes/auth.route'
import dotenv from 'dotenv'
import { connetDB } from './lib/db';
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connetDB()
});
 