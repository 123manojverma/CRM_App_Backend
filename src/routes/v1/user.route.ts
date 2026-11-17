import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import { createUserValidator } from "../../validators/user.validators.js";

const userRouter:Router=Router();

userRouter.get('/:id',userController.getUser);
userRouter.get('/',userController.getAllUsers);
userRouter.post('/',createUserValidator,userController.createUser);

export default userRouter;