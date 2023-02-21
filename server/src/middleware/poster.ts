import { Request, Response } from "express";
import { createUser } from "../controller/controller";
export default async function poster(req : Request , res : Response) {
    try {
        const data = req.body 
        const { user, error } = await createUser(data);
        if (error) throw new Error(String(error));
        return res.status(200).json({ user });
      } catch (error : any ) {
        return res.status(500).json({ error: error.message });
      }
}