import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import router from './routes/router';
import contacter from './routes/contact';
import conversation from './routes/conversation';
import WEBS from './controller/socket';
import prisma from './config/prisma';
dotenv.config()
export const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended : false }))
app.use('/', [router , contacter , conversation])
const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: "http://localhost:5173",
    credentials:true,
  }
})
const PORT =  process.env.PORT || 8000 
io.on('connection', (s) =>{ 
const webs = new WEBS(s, prisma)
const MYID =s.handshake.query.userId
webs.connection()
s.on('login', () => webs.login())
s.on('logout', () => webs.logout())
s.on('message', () => webs.msg())
s.on('disconnect', () => webs.disconnect())
s.on('conversationChange', () => webs.Changer())
})
server.listen(PORT , () => console.log(`http://localhost:${PORT}`))
server.on('error', e => console.error("Error", e));







