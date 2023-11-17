const jwt=require('jsonwebtoken')

function GeneratToken(obj,role){
    const maxAge = 60 * 60 * 24 * 3 // 3 days
 const token=jwt.sign({...obj,role},process.env.TOKEN_KEY,{expiresIn:maxAge*1000})
 return token
}

module.exports={
    GeneratToken
    ,
    verfyToken:async(req,res,next)=>{
        try{
            const token = req.headers["authorization"]
             if(token?.split(" ")[1]==null){
                res.json({status:false,type:'user'})
            }else{
             const valid=jwt.verify(token?.split(" ")[1],process.env.TOKEN_KEY)
             console.log(valid);
             if(valid){
                req.User=valid
                next()
             }
            }
           
        }catch(err){
console.log(err);
        }
    }
}