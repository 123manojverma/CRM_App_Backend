import { Router } from "express";
import userController from "../../controllers/user.controller.js";

const userRouter:Router=Router();

userRouter.get('/:id',userController.getUser);
userRouter.get('/',userController.getAllUsers);

export default userRouter;