import {Request, Response} from 'express';
import IController from './ControllerInterfaces';

let data:any[];
data = [
    {id :1,name:"budi"},
    {id :2,name:"budi2"},
    {id :3,name:"budi3"},
]

class UserController implements IController{
    index(req:Request,res:Response): Response {
        return res.send(data);
    }
    create(req:Request,res:Response): Response {
        const { id,name } = req.body;
        data.push({id:id,name:name});
        return res.send("create success");
    }
    show(req:Request,res:Response): Response {
        const { id } = req.params;
        let person = data.find(item => item.id == id);
        return res.send(person);

    }
    update(req:Request,res:Response): Response {
        const {id} = req.params;
        const {name} = req.body;

        let person = data.find(item => item.id == id);
        person.name = name;

        return res.send("update success");

    }
    delete(req:Request,res:Response): Response {
        const {id} = req.params;
        let person = data.filter(item => item.id != id);

        return res.send(person);
    }
}

export default new UserController();
