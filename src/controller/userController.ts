import { signup, login } from "../repositories/userLogs";
import { User } from "../interFace/user";
import { Request, Response } from "express";
import { setCookie } from "../cookie/setCookie";
import prisma from "../prisma";
export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: User = req.body;
    const existingUser = await prisma.user.findFirst({
      where:{
        OR:[
         {
          email:user.email,
          username:user.username
         }
        ]
      }
    })
    if (existingUser){
      return res.status(409).send("user already exist")
    }
    if (!user.email || !user.password || !user.username) {
      return res.status(401).send("Incomplete data");
    }

    const newUser = await signup(user);

    if (!newUser) {
      return res.status(404).send("User not created");
    }

    // Set cookie BEFORE response
    setCookie(newUser, res);

    // Remove sensitive info
    const { id,password, ...userWithoutPasswordAndPass } = newUser;

    return res.status(200).json({
      success: true,
      user: userWithoutPasswordAndPass,
    });
  
  } catch (err) {
    
    console.error("Signup error:", err);
    return res.status(500).send("Internal server error");
  }
};

export const logIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const data: User | null = await login(email);

    if (!data) {
      return res.status(404).send("User does not exist!");
    }

    if (password !== data.password) {
      return res.status(401).send("Invalid credentials");
    }

    // Set cookie BEFORE response
    setCookie(data, res);

    const {password:_p,id:_i, ...secureUser } = data;

    return res.status(200).json({
      success: true,
      user: secureUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Internal server error during login");
  }
};
