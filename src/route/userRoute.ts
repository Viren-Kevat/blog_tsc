import { Router } from "express";
import { signUp,logIn } from "../controller/userController";

const router = Router();


router.route("/signup").post(signUp);
router.route("/login").post(logIn);

export default router;