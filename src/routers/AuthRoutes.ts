import {Router,Request,Response} from 'express';
import IRouter from './RouteInterfaces';

//controller
import AuthController from "../controllers/AuthController";
import BaseRoutes from './BaseRouter';

class AuthRoutes extends BaseRoutes{

    public routes():void{
        this.router.post("/register",AuthController.register);
        this.router.post("/tambah",AuthController.login);
    }
}

export default new AuthRoutes().router;