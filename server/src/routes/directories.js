import {Router} from 'express';
import {requireAuth,requireAdmin} from '../middleware/auth.js';
const router=Router();
router.get('/',requireAuth,async(req,res)=>{const {rows}=await req.app.locals.db.query('SELECT id,name,storage_prefix,description FROM directories ORDER BY name');res.json(rows)});
router.get('/mine',requireAuth,async(req,res)=>{const {rows}=await req.app.locals.db.query(`SELECT d.id,d.name,d.storage_prefix,d.description FROM directories d JOIN user_directory_access a ON a.directory_id=d.id WHERE a.user_id=$1 ORDER BY d.name`,[req.user.id]);res.json(rows)});
router.put('/:directoryId/access/:userId',requireAuth,requireAdmin,async(req,res)=>{const {directoryId,userId}=req.params;await req.app.locals.db.query('INSERT INTO user_directory_access(user_id,directory_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[userId,directoryId]);res.status(204).end()});
router.delete('/:directoryId/access/:userId',requireAuth,requireAdmin,async(req,res)=>{await req.app.locals.db.query('DELETE FROM user_directory_access WHERE user_id=$1 AND directory_id=$2',[userId,directoryId]);res.status(204).end()});
export default router;
