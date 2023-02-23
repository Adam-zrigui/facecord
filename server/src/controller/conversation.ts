import { PrismaClient , Conversation } from "@prisma/client";
import { Request , Response } from "express";
import { generic500Error } from "../utils/constants";

export default class CONVERSATIONCONTROLLER {
    constructor(private prisma : PrismaClient){}
    async getCon(req : Request , res : Response){
        try {
            const MYID = req.user?.id as string;
            const conversationId = req.params.id
            if (typeof conversationId !== 'string') return res.status(400).json({message:"not found",})
       const foundcon = await this.prisma.conversation.findUnique({where : {id : conversationId},include:{messages:{orderBy:{createdAt: 'asc'} }}})
    if (!foundcon) return res.status(404).json({message: "conversation not found"})       
if(!this.isMyCon(MYID , foundcon)) return res.status(401).json({message:"no access to this conversation"})
return res.status(200).json({foundcon})
} catch (error) {
            generic500Error(res ,error);
        }
    }
    async createMsg(req : Request , res : Response){
        try {
            const MYID = req.user?.id as string;
           
            const {text, conversationId} : {text : string , conversationId : string} = req.body;

            const conversation = await this.prisma.conversation.findUnique({where : {
                id: conversationId
            }})
            if (!conversation) return res.status(404).json({message: "conversation not found"})
       
            if(!this.isMyCon(MYID , conversation)) return res.status(401).json({message:"no access to this conversation"})
const newMsg = await this.prisma.message.create({
    data: {
        from: MYID,
        text,
        conversationId
    }
})
           return res.status(201).json({message: newMsg})
        } catch (error) {
            generic500Error(res ,error);
        }
    }
    isMyCon(id : string, conversation: Conversation){
        return conversation.participants.includes(id)
    }
}