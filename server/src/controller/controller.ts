import { Response , Request } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generic500Error } from "../utils/constants";
import crypto from 'crypto'
export const jwtsecret = crypto.randomBytes(32).toString('hex');
export default class AUTHCONTROLLER {
    constructor(private prisma: PrismaClient) {
        
    }
    async login(req : Request, res : Response) {
try {
    const {username , password} = req.body;
    const userHere = await this.prisma.user.findUnique({where : { username }})
    if (!userHere) {
        return res.status(400).json({message : "invalid credentials"})
    }
    const validPassword = await this.comparePassword({password , hashPassword : userHere.password})
    if (!validPassword) {
        return res.status(400).json({message : "invalid credentials"})
    }
    const token = await this.generateJWT({id : userHere.id, username : userHere.username})
    userHere.password = ''
    return res.status(200).json({user: userHere , jwt: token})
} catch (error) {
    generic500Error(res , error);
}
    }
    async register(req : Request, res : Response) {
 try {
const {username , password} = req.body 
const userHere = await this.prisma.user.findUnique({where : { username }})

if (userHere) {
    return res.status(400).json({message : "User already registered"})
}
const hashPassword = await this.hashPassword(password)
const createdUser = await this.prisma.user.create({
    data : {
        username,
        password: hashPassword,
        photo: this.generateRandomAvatar()
    }
})
const token = await this.generateJWT({id : createdUser.id, username : createdUser.username})
createdUser.password = ''
return res.status(200).json({user: createdUser , jwt: token})
} catch (error) {
    generic500Error(res , error);
}
    }
    logout(req : Request, res : Response) {
try {
    return res.status(200).json({message : "logged out!"})
} catch (error) {
    generic500Error(res , error);
}
    }
    async hashPassword(password: string) {
 const salt = 12
 return await bcrypt.hash(password, salt)
     }
     async generateJWT({id , username} : {id: string , username: string}) {
        return jwt.sign({id , username}, jwtsecret as string, {
           expiresIn: '86400s' 
        })
     }
     async comparePassword({password , hashPassword} :{password : string , hashPassword : string}) {
 return await bcrypt.compare(password, hashPassword)
     }
 generateRandomAvatar(){
        const gender = Math.round(Math.random())
        const imageNumber = Math.ceil(Math.random() * 98)
        return `https://randomuser.me/api/portraits/med/${gender === 0 ? 'men' : 'women'}/${
            imageNumber.toString()
        }.jpg`
    }
}