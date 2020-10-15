import {Request, Response} from 'express';
import IController from './ControllerInterfaces';

const db = require("../db/models");

class TodoController implements IController{
    index= async(req:Request,res:Response): Promise<Response> => {
        const{id} = req.app.locals.credential;

        const todo = await db.todo.findAll({
            where:{user_id:id},
            attributes:['id','description']
        });

        return res.json({
            'status':200,
            'message':"get all todo",
            'data':todo
        });
        
    }
    create = async(req:Request,res:Response): Promise<Response> =>{
        const{id} = req.app.locals.credential;
        const{description} = req.body;

        const todo = await db.todo.create({
            user_id:id,
            description:description
        });

        return res.send({
            'status':200,
            'message':"success add todo",
            'data':todo
        });
    }
    show=async(req:Request,res:Response): Promise<Response> => {
        const {id:user_id}=req.app.locals.credential; // id direname user_id
        const{ id }  = req.params;
        const todo = await db.todo.findOne({
            where:{id:id,user_id:user_id}
        });

        return res.json({
            'status':200,
            'message':"success get one todo",
            'data':todo
        });

    }
    update=async(req:Request,res:Response): Promise<Response> => {
        const {id:user_id}=req.app.locals.credential; // id direname user_id
        const{ id }  = req.params;
        const {description} = req.body;

        await db.todo.update({
            description
        },
        {
        where:{
                id:id,user_id:user_id
        }});

        const todoData = await db.todo.findOne({
            where:{id:id,user_id:user_id},
            attributes:['id','user_id','description']
        })

        return res.json({
            'status':200,
            'message':"success update todo",
            'data':todoData
        });

    }
    delete=async(req:Request,res:Response): Promise<Response> => {
        const {id:user_id}=req.app.locals.credential; // id direname user_id
        const{ id }  = req.params;

        await db.todo.destroy({
            where:{
                id:id,user_id:user_id
            }
        });

        return res.json({
            'status':200,
            'message':"success delete todo",
        });

    }
}

export default new TodoController();
