import { Router } from "express";
import { verifyToken } from "../middlewares/jwtVerify";
import prisma from "../config/prisma";
import CONVERSATIONCONTROLLER from "../controller/conversation";
import validate from "../middlewares/validator";
import { createMsgReq } from "../mongo/valid";

const conversation = Router()
const convercon = new CONVERSATIONCONTROLLER(prisma) 
const baseurl = '/conversation'

conversation.get(`${baseurl}/:id`, verifyToken(), (req , res) => convercon.getCon(req , res))
conversation.post(`${baseurl}`, validate(createMsgReq), verifyToken(), (req , res) => convercon.createMsg(req , res))


export default conversation