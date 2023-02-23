import  { Request, Response, Router }   from "express";
import prisma from "../config/prisma";
import AUTHCONTROLLER from "../controller/controller";
import { authReq } from "../mongo/valid";
import validate from "../middlewares/validator";

const router = Router()
const authController = new AUTHCONTROLLER(prisma)

router.post('/auth/login', validate(authReq), (req : Request, res : Response) => {
authController.login(req, res)
})

router.post('/auth/register', validate(authReq), (req , res) => {
authController.register(req, res)
} )
router.get('/auth/logout', (req , res) => {
authController.logout(req, res)
} )






export default router;