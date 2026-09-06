import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
  

const router = express.Router();
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production';
    sameSite: 'strict',
    maxAge: 24*60*50*1000;
}
 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
 } 

 //register
 router.post('/register', async (req,res)=>{
    const  {username,email,password}  = req.body;
    if(!username||!email|| !password){
        return res.status(400).json({message: 'please requied all the field    '})
    }

   const userExists = await pool.query('select * from  users where  email = $1', [email]);
   if(userExists.rows.length>0){
    return res.status(400).json({message:'User already exist'});
   }
   const hashedPassword = await bcrypt.hash(password,10);
   const newUser = await pool.query(
    'INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING id,name,email',
    [username,email,hashedPassword]
   );
   const token = generateToken(newUser.row[0].id);
   res.cookie('token', token , cookieOptions);

    return res.status(201).json({user:newUser.rows[0] });
 })


