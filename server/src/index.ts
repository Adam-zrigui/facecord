import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import router from './routes/router';
config({path: path.resolve(__dirname , "./config/.env")})
export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', [router])
app.use(express.urlencoded({ extended : false }))
const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: "http://localhost:5173",
    credentials:true,
  }
})
const PORT =  process.env.PORT || 8000 
io.on('connection', (s) => console.log(s))
server.listen(PORT , () => console.log(`http://localhost:${PORT}`))
server.on('error', e => console.error("Error", e));







