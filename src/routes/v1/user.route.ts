import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import { createUserValidator, signinUserValidator } from "../../validators/user.validators.js";

const userRouter:Router=Router();

userRouter.get('/:id',userController.getUser);
userRouter.get('/',userController.getAllUsers);
userRouter.post('/signup',createUserValidator,userController.createUser);
userRouter.post('/signin',signinUserValidator,userController.signinUser);

export default userRouter;