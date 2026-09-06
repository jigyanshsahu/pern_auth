import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



dotenv.config();




const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("hello world");
});
const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
})
