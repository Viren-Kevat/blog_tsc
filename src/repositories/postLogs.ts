import prisma from "../prisma";
import { Post,DataPassPost } from "../interFace/post";


export const create = async(user:string,data:DataPassPost)=>{
    const userId = user;
    const {msg,title} = data
    try{
        const existingUser = await prisma.user.findUnique({
        where:{id:userId}
    })      

    if (!existingUser) {
        return ("user dont exist")
    }

    return await prisma.post.create({
            data:{
                userId:userId,
                title :title,
                msg:msg
            }
        })
    }catch(err){
        console.log(err);
        throw new Error(`Error from postLogs.ts line 18 and its ${err}`) 
    }
}

export const findAllOfUser = async(userId:string)=>{
    try{
        const id =  userId;
  
        const existingUser = await prisma.user.findUnique({
            where:{id:id },
            
        })
        if(!existingUser){
            return ("user doesnot exist")
        }
        const posts =  await prisma.post.findMany({
            where:{userId:id}  
        })

        if(!posts){
            return ("user has zero post");
        }

        return {user:existingUser,posts};

    }catch(err){
        console.log(err);
        throw new Error(`error from postlogs.ts line 25 and its ${err}`)
        
    }
}


export const findOnePost = async (postId:string)=>{
    try {
        const Id = postId;
        
        const post = await prisma.post.findUnique({
            where:{id:Id}
        })
        const userId  = post?.userId;

        const user = await prisma.user.findUnique({
            where:{id:userId}
        })


        if (!post) {
            return("post doesnt exists")
        }

        return {user,post};

    } catch (err) {
        console.log(err);
        throw new Error(`error from postLogs.ts line 48 and its ${err}`)
        
    }
}


export const  findAll = async ()=>{
    try {
        const data = await prisma.post.findMany({})
        if (!data || data.length === 0) {
            return ("zero post")
        }
        return data
    } catch (err) {
        console.log(err);
        throw new Error(`error from postlog.ts line 69 and its ${err}`)     
    }
}

export const update = async (data:{id:string,title:string,msg:string
})=>{
    try {
        const {id,title,msg}= data
        const newBlog = await prisma.post.update({
            where:{id:id},
            data:{
                title:title,
                msg:msg,
            }
        })
        if (!newBlog) {
            return ("post doesnt exist")
        }
        return newBlog;
    } catch (error) {
        console.log(error);
        throw new Error(`error from postlog.ts line 105 and its ${error}`)        
    }
}


export const deletePost = async (postid:string)=>{
    try {
        const id = postid;
        const execute  = await prisma.post.delete({
            where:{id:id}
        })
        if (!execute) {
            throw new Error(`deltetion failed`);
        }
        return (`successfully deleted post  `)
    } catch (error) {
        console.log(error);
        throw new Error(`error form postlog.ts line 127 and its ${error}`);
        
    }
}