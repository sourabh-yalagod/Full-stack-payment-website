import dotenv from "dotenv";
import { connectDb } from "./src/database/index.js";
import app from './app.js'
dotenv.config({ path: "./.env" });

connectDb()
app.listen(process.env.PORT,()=>{
    console.log(`Server is on : http://localhost:${process.env.PORT}`);
})