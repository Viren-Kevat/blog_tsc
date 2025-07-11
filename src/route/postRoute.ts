import { Router } from "express";

import { createPost,findOnePostUser,findAllPost ,findAllOfUserPost,Update ,DeletePost} from "../controller/postController";
const router = Router();

router.route("/create").post(createPost);
router.route("/findSinglePost/:id").get(findOnePostUser);
router.route("/findAllPostOfUser/:id").get(findAllOfUserPost);
router.route("/find").post(findAllPost);
router.route("/update/:id").get(Update)
router.route("/delete/:id").get(DeletePost)

export default router;