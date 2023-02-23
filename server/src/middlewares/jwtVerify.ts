import { Request , Response , NextFunction} from "express";
import  jwt  from "jsonwebtoken";
import { jwtsecret } from "../controller/controller";
import { decodedUser } from "../interfaces/app";
import { generic500Error } from "../utils/constants";


export const verifyToken = () => async (req : Request , res : Response , next : NextFunction) => {
    try {
        const bearerToken = req.headers['authorization']
        
        if (!bearerToken) return res.status(403).json({message: "No token provided"})
   if (!jwtsecret) return res.status(500).json({message: "...find it !" })
        const bearer = bearerToken.split(' ')
   const token = bearer[1]
   await jwt.verify(token, jwtsecret , (error , decodedUser) =>{
if (error) return res.status(403).json({message: "invalid token"})
req.user = decodedUser as decodedUser
next()
   })
    } catch (error) {
        return generic500Error(res, error)
    }
}