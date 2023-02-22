//@ts-strict
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import getter from './middleware/getter';
import poster from './middleware/poster';
config({path: path.resolve(__dirname , "./config/.env")})
export const app = express()
app.use(express.json())
app.use(cors())
app.get('/', getter)
app.post('/post', poster) 
const PORT =  process.env.PORT || 8000 
const server = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
 server.on('error', e => console.error("Error", e));







