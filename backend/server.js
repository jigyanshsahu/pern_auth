import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors  from 'cors';
import authRoutes from './routes/auth.js';


dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRoutes);



const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
})
