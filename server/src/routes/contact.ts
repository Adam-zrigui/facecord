import { Router } from "express";
import { verifyToken } from "../middlewares/jwtVerify";
import CONTACTCONTROLLER from "../controller/contact";
import prisma from "../config/prisma";

const contacter = Router()

const concon = new CONTACTCONTROLLER(prisma);


contacter.get('/contact', verifyToken(), (req , res) => concon.getContacts(req , res) )
contacter.post('/contact', verifyToken(), (req , res) => concon.createContacts(req , res) )


 

export default contacter