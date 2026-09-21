import {Router} from 'express';
import {requireAuth} from '../middleware/auth.js';
const router=Router();

// The S3 integration belongs here. After permission checks, generate a short-lived
// presigned S3 URL instead of making the bucket public.
router.get('/',requireAuth,async(req,res)=>{
  const {rows}=await req.app.locals.db.query(`SELECT m.id,m.filename,m.media_type,m.storage_key,m.directory_id FROM media m JOIN user_directory_access a ON a.directory_id=m.directory_id WHERE a.user_id=$1 ORDER BY m.created_at DESC`,[req.user.id]);
  res.json(rows.map(file=>({...file,media_url:null,s3_status:'TODO: generate presigned URL'})));
});
export default router;
