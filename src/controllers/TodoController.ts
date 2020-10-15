import {Request, Response} from 'express';
import IController from './ControllerInterfaces';
const db = require("../db/models");
import TodoService from '../services/TodoServices';

class TodoController implements IController{
    index= async(req:Request,res:Response): Promise<Response> => {
        const service = new TodoService(req);
        const todo = await service.getAll();

        return res.json({
            'status':200,
            'message':"get all todo",
            'data':todo
        });
        
    }
    create = async(req:Request,res:Response): Promise<Response> =>{
        const service = new TodoService(req);
        const todo = service.store();

        return res.send({
            'status':200,
            'message':"success add todo",
            'data':todo
        });
    }
    show=async(req:Request,res:Response): Promise<Response> => {
        const service = new TodoService(req);
        const todo = service.getOne();

        return res.json({
            'status':200,
            'message':"success get one todo",
            'data':todo
        });

    }
    update=async(req:Request,res:Response): Promise<Response> => {
        // const {id:user_id}=req.app.locals.credential; // id direname user_id
        const service = new TodoService(req);
        const todo = service.update();

        return res.json({
            'status':200,
            'message':"success update todo",
            'data':todo
        });

    }
    delete=async(req:Request,res:Response): Promise<Response> => {
        const service = new TodoService(req);
        const todo = service.delete();

        return res.json({
            'status':200,
            'message':"success delete todo",
        });

    }
}

export default new TodoController();
