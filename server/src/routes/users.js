import {Router} from 'express';
import {requireAuth,requireAdmin} from '../middleware/auth.js';
const router=Router();

// CRUD template. Replace direct query bodies with your validation/auth rules.
router.get('/',requireAuth,requireAdmin,async(req,res)=>{const {rows}=await req.app.locals.db.query('SELECT id,email,first_name,last_name,role,created_at FROM users ORDER BY id');res.json(rows)});
router.post('/',requireAuth,requireAdmin,async(req,res)=>{const {email,first_name,last_name,role='user'}=req.body;const {rows}=await req.app.locals.db.query('INSERT INTO users(email,first_name,last_name,role,password_hash) VALUES($1,$2,$3,$4,$5) RETURNING id,email,first_name,last_name,role',[email,first_name,last_name,role,'REPLACE_WITH_BCRYPT_HASH']);res.status(201).json(rows[0])});
router.put('/:id',requireAuth,requireAdmin,async(req,res)=>{const {email,first_name,last_name,role}=req.body;const {rows}=await req.app.locals.db.query('UPDATE users SET email=$1,first_name=$2,last_name=$3,role=$4 WHERE id=$5 RETURNING id,email,first_name,last_name,role',[email,first_name,last_name,role,req.params.id]);res.json(rows[0])});
router.delete('/:id',requireAuth,requireAdmin,async(req,res)=>{await req.app.locals.db.query('DELETE FROM users WHERE id=$1',[req.params.id]);res.status(204).end()});
export default router;
