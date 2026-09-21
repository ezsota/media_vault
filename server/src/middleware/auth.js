// TEMPLATE: Replace this demo middleware with real session/JWT authentication.
// It should identify req.user from a secure server-side session or verified token.
export function requireAuth(req,res,next){
  // Development placeholder. Never trust a client-supplied user id in production.
  const userId=Number(req.header('x-demo-user-id'));
  if(!userId)return res.status(401).json({message:'Authentication required'});
  req.user={id:userId};
  next();
}

export function requireAdmin(req,res,next){
  // TEMPLATE: Query PostgreSQL for req.user.id and verify role === 'admin'.
  const isDemoAdmin=req.header('x-demo-admin')==='true';
  if(!isDemoAdmin)return res.status(403).json({message:'Admin access required'});
  next();
}
