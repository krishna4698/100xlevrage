import express from 'express'
import authRouter from "./routes/auth.route.js"
import { client } from 'db/client'; 
const app=express();
app.use(express.json());
import cors from 'cors'
app.use(cors({origin:"http://localhost:3000"}))

app.use("/auth",  authRouter)

app.listen(3001,()=>{
    console.log("server is listening to 3001");
    
})
app.get("/users", async (req, res) =>{
    const users= await client.user.findMany();
    res.json(users)
})