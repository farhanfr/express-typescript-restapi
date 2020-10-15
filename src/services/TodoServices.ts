import {Request} from 'express';
const db = require("../db/models");

class TodoServices{
    credential:{
        id:number
    };
    body:Request['body'];
    params:Request['params'];

    constructor(req:Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }

    getAll = async()=>{
        const todo = await db.todo.findAll({
            where:{user_id:"5"},
            attributes:['id','description']
        });
        return todo;
    }

    store = async()=>{
        const{description} = this.body;

        const todo = await db.todo.create({
            user_id:this.credential.id,
            description:description
        });
    }

    getOne = async() => {
        const{ id }  = this.params;
        const todo = await db.todo.findOne({
            where:{id:id,user_id:this.credential.id}
        });
        return todo;
    }

    update = async() => {
        const{ id }  = this.params;
        const {description} = this.body;

        const todo = await db.todo.update({
            description
        },
        {
        where:{
                id:id,user_id:this.credential.id
        }});

        const todoData = await db.todo.findOne({
            where:{id:id,user_id:this.credential.id},
            attributes:['id','user_id','description']
        })

        return todoData;
    }

    delete = async() =>{
        const{ id }  = this.params;

        const todo = await db.todo.destroy({
            where:{
                id:id,user_id:this.credential.id
            }
        });

        return todo;
    }
}

export default TodoServices;

    
