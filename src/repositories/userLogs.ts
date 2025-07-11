import prisma from "../prisma";
import { User } from "../interFace/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import { Prisma } from "@prisma/client";



export const signup = async(user:User)=>{
    try{
   return await prisma.user.create({
            data:user
        });
    }catch(err){
        
        throw new Error("db err form userLog.ts line number 17")
    }
    
}


export const login = async (email:string)=>{
   
    return await prisma.user.findFirst({
        where:{email},  
    });
 
    
}
