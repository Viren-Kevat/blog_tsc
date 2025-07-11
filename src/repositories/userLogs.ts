import prisma from "../prisma";
import { User } from "../interFace/user";
// import { Prisma } from "@prisma/client";



export const signup = async(user:Omit<User, "id" | "post" | "comment">)=>{
    try{
   return await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
            },
            include: {
                Post: true,
                Comment:true
            },
        });
    }catch(err){
        
        throw new Error("db err form userLog.ts line number 17")
    }
    
}


export const login = async (email:string)=>{
   
    return await prisma.user.findFirst({
        where: { email },
        include: {
            Post: true, 
            Comment:true
        },
    });
 
    
}
