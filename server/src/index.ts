import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
config({path: path.resolve(__dirname , "./config/.env")})
export const app = express()
app.use(express.json())
app.use(cors())



const PORT =  process.env.PORT || 8000 
const server = app.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`);
  });
 server.on('error', e => console.error("Error", e));







