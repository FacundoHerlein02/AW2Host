import jwt from "jsonwebtoken"
import 'dotenv/config';
const secret=process.env.SECRET;
const verifyToken=(token)=>{

    if(!token)
    {
        return false
    }
    try {
        const decode =jwt.verify(token,secret);
        console.log(decode);        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
};
export const decodeToken=(token)=>{
    if(!verifyToken(token))
    {
        return false
    }
    const decode= jwt.verify(token,secret)
    return decode
};