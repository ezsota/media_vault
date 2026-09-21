import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Pool} from 'pg';
import usersRouter from './routes/users.js';
import directoriesRouter from './routes/directories.js';
import mediaRouter from './routes/media.js';

dotenv.config();
const app=express();
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());
const pool=new Pool({connectionString:process.env.DATABASE_URL});
app.locals.db=pool;
app.get('/api/health',async(req,res)=>{try{await pool.query('SELECT 1');res.json({ok:true,database:'connected'})}catch(error){res.status(503).json({ok:false,database:'unavailable',message:error.message})}});
app.use('/api/users',usersRouter);
app.use('/api/directories',directoriesRouter);
app.use('/api/media',mediaRouter);
app.listen(process.env.PORT||4000,()=>console.log(`Media Vault API listening on http://localhost:${process.env.PORT||4000}`));
