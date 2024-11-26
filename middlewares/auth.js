import jwt from 'jsonwebtoken'

function verifyToken(req, res, next){
    const token = req.header("Authorization")
    if(!token){
        return res.status(401).json({message: "Access Denied"})
    }
    console.log(token)
    try{
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );
        console.log({decoded})
        // req.user = decoded
        next()
    }catch (err){
        console.log("Error verifying token: ", err)
        res.status(401).json({message: "Invalid Token"})
    }
}

export default verifyToken;