import {client} from "db/client";
import { loginschema, registerschema } from "../schemas/auth.type.js";
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken'
const secret="hefmemf"

export const register=  async (req: Request, res:Response)=>{
    try{
        const result= registerschema.safeParse(req.body);
        if(!result.success){
            res.json({
                error :result.error.message
            })
        }
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({error:"all fields required"})
        }
       const user= await client.user.findFirst({
        where:{
            email
        }
       })
        if(user) return res.status(400).json({message :"user already exist"})
            const newuser= await client.user.create(
        {
            data:{
                email,
                password
            }
        })
        res.status(200).json(newuser)
    }
    catch(e){
        return res.status(400).json(e);
    }
}
export const Login= async (req:Request, res:Response)=>{
         
    try{
        const result= loginschema.safeParse(req.body);
        if(!result.success) return res.status(200).json({error:result.error.message})

            const {email, password}=req.body;
            const user= await client.user.findFirst({
                where:{
                    email
                }
            })
            if(!user) return res.status(200).json({message:"user dont exist "})

           if (password!==user.password) return res.status(200).json({message:"unauthorized"})
            const token = jwt.sign({id:user.id, email:user.email}, secret)
        res.cookie(token, token,{
           httpOnly: true,
          sameSite: "strict",
           maxAge: 60 * 60 * 1000,
        })
        res.status(200).json({
            id:user.id,
            email:user.email,
            password:user.password,
            token:token
        })
    }
    catch(e){
        return res.json(e)
    }

}

