import express from 'express';
import { config } from 'dotenv';
config({path:"./config/.env"})
const app = express();
app.use(express.json());











const PORT = process.env.PORT || 8000 
app.listen(PORT, (err) => err ? console.error(err) : console.log(`http://localhost:${PORT}`))
export default app;