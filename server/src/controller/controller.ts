import prisma from '../config/prisma';

interface userdb {
    username: string;
    email: string;
   
    password: string;
 }
export async function createUser(user :userdb ) {
    try {
        const userFrom = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password : user.password
            },
        })
        return { user: userFrom}
    } catch (error : any) {
        return { error: error.message}
    }
}
export async function getUsers() {
try {
        const users = await prisma.user.findMany()
        return {users}
} catch (error : any) {
    return { error: error.message }
}
}   
export async function FindId(id : object) {
    try {
        const user = await prisma.user.findUnique({where :  id })
        return { user }
    } catch (error : any) {
        return { error: error.message }
    }
}