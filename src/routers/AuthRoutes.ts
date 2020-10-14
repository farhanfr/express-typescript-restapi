import {Router,Request,Response} from 'express';
import IRouter from './RouteInterfaces';

import validate from '../middlewares/AuthValidator';
import {auth} from "../middlewares/AuthMiddleware";

//controller
import AuthController from "../controllers/AuthController";
import BaseRoutes from './BaseRouter';

class AuthRoutes extends BaseRoutes{

    public routes():void{
        this.router.post("/register",validate,AuthController.register);
        this.router.post("/login",validate,AuthController.login);
        this.router.get("/profile",auth,AuthController.profile);
    }
}

export default new AuthRoutes().router;