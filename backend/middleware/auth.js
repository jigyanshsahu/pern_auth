import jwt from 'jsonwebtoken';
import pool from "../config/db.js";


export const protect = async (req,res,next) => {
    try{
      const  token = req.cookies.token;
       if(!token){
         res.status(401).json({message: "no token    "});
       }
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       const user = await pool.query("select id,name,email from users where id = $1", [decoded.id]);
       if(!user.rows.length ===0){
        return res.status(401).json({message: "not autorized no user was found"});
    }
     req.user = user.rows[0];
     next();
    }

    catch (error){
         console.error(error);
         res.status(401).json({message: "not authorized token fail"});

    }
}