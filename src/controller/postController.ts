import { create,findAll,findAllOfUser,findOnePost,update,deletePost } from "../repositories/postLogs";
import { Request,Response } from "express";



export const createPost = async(req:Request,res:Response)=>{
    try {
        const {userId,msg,title} = req.body;
        const data = {msg,title}

        const post = await create(userId,data);
        if (!post) {
            return res.status(500).send("errr form post constoller.ts create")
        }
        return res.status(200).json({
            success:true,
            post
        })

    } catch (err) {
        console.log(err);
        
    }
}

export const findAllOfUserPost =  async (req:Request,res:Response)=>{
    try {
        let {id:userId} = req.params;
        // console.log(userId);
        
        let data = await findAllOfUser(userId)       

        
        return res.status(200).json({
            data,
            success:true
        })

    } catch (err) {
        console.log(err);
        
    }
}

export const findOnePostUser=async (req:Request,res:Response)=>{
    try {
        const {id:id} = req.params
        const data = await findOnePost(id)
        res.status(200).json({
            data,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const findAllPost = async (req:Request,res:Response)=>{
    try {
        const data  = await findAll();
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const Update = async (req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const {title,msg} = req.body;
        const data = {id,title,msg}
        const execute = await update(data);

        res.status(200).json({
            execute
        })
    } catch (error) {
        console.log(error);
    }
}

export const DeletePost = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const dlt = await deletePost(id)
        res.status(200).json({
            dlt
        })
    } catch (error) {
        console.log(error);
        
    }
}