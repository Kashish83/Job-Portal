const authorize=(role)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"Not Authorized"});
        }

        if(req.user.role!==role){
            return res.status(403).json({message:"Forbiden:access denied"});
        }
        next();
    };

};
module.exports={authorize};