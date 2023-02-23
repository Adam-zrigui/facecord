import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generic500Error } from "../utils/constants";

export default class CONTACTCONTROLLER {
    constructor(private prisma : PrismaClient){}
async newContact({
    userId,
    username,
    photo,
    conversationId,
}:{
    userId: string,
    username: string,
    photo: string,
    conversationId: string,
}) {
    return await this.prisma.contact.create({
        data: {
            userId,
            username,
            photo,
            conversationId
        }
    })
}
async newConversation(idArray : string[]) {
return await this.prisma.conversation.create({
    data: {
        participants: idArray
    }
})
}

    async getContacts(req : Request, res : Response){
        try {
            const MYID = req.user?.id;
            const contacts = await this.prisma.contact.findMany({
  where: { userId : MYID },
  orderBy: {createdAt: 'asc'}
            })
return res.status(200).json({contacts});
        } catch (error) {
            return generic500Error(res , error);
        }
    }
    async createContacts(req : Request, res : Response){
        try {
            const MYID = req.user?.id as string;
            const {username} : {username : string} = req.body
            // if exist
            const related = await this.prisma.user.findUnique({where: {username}})
     if (!related) return res.status(404).json({message : "Could not find it"})
     //if exist but is my username
     if (related.id === MYID) return res.status(404).json({message: "you can't add yourself as a contact"})
    const exist = await this.prisma.contact.findFirst({where : {userId : MYID,username}})  
    if (exist) return res.status(400).json({message : 'Contact already exist'}) 
 const conExist = await this.prisma.conversation.findFirst({
    where: {participants: {hasEvery: [MYID , related.id]}}
 })
if(conExist) {
    const contact = await this.newContact({userId : MYID,username, photo: related.photo , conversationId: conExist.id })
return res.status(201).json({message: 'New contact created', contact})
}
const conversation = await this.newConversation([MYID, related.id])
const contact = await this.newContact({userId : MYID,username, photo: related.photo , conversationId: conversation.id })
return res.status(201).json({message: 'New contact created', contact})

} catch (error) {
            return generic500Error(res , error);
        }
    }
}