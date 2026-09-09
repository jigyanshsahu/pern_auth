import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';
  

const router = express.Router();
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24*60*50*1000
}
 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
 } 

 //register
 router.post('/register', async (req,res)=>{
    const  {name,email,password}  = req.body;
    if(!name||!email|| !password){
        return res.status(400).json({message: 'please requied all the field    '})
    }

   const userExists = await pool.query('select * from  users where  email = $1', [email]);
   if(userExists.rows.length>0){
    return res.status(400).json({message:'User already exist'});
   }
   const hashedPassword = await bcrypt.hash(password,10);
   const newUser = await pool.query(
    'INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING id,name,email',
    [name,email,hashedPassword]
   );
   const token = generateToken(newUser.rows[0].id);
   res.cookie('token', token , cookieOptions);

    return res.status(201).json({user:newUser.rows[0] });
 })

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'please provide all required field' });
    }
    const user = await pool.query('select * from users where email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const userData = user.rows[0];
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const token = generateToken(userData.id);
    res.cookie('token', token, cookieOptions);
    res.json({
        user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        }
    });
});


// ME
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
    // return info of the loggined user
});



router.post('/logout', async (req, res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
    res.json({ message: 'logout successfully' });
});
export default router;
