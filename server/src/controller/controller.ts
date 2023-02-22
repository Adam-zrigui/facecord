import { Response , Request } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generic500Error } from "../utils/constants";
const jwtsecret = process.env.JWT_SECRET
export default class AUTHCONTROLLER {
    constructor(private auth: PrismaClient) {
        
    }
    async login(req : Request, res : Response) {
try {
    return;
} catch (error) {
    generic500Error(res , error);
}
    }
    async register(req : Request, res : Response) {
try {
return    
} catch (error) {
    generic500Error(res , error);
}
    }
    logout(req : Request, res : Response) {
try {
    return
} catch (error) {
    generic500Error(res , error);
}
    }
    // async hashPassword() {

    // }
    // async generateJWT() {}
    // async comparePassword() {}
    // generateRandomAvator(){}
}