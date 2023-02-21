import { Request, Response } from "express";
import { getUsers } from "../controller/controller";
export default async function getter(req : Request , res : Response) {
    try {
        const { users , error} = await getUsers()
        if (error) throw new Error(String(error))
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
