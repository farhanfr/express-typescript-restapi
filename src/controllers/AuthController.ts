import { compare } from 'bcrypt';
import { Request, response, Response } from 'express';
import Authentication from '../utils/Authentication';
import PasswordHash from '../utils/Authentication';

const db = require("../db/models");

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        let {username,password} = req.body;
        const hashPassword:string = await PasswordHash.hash(password);
        const createUser = await db.user.create({
            username:username,
            password:hashPassword
        });
        return res.json({
            'status': 200,
            'message': "success add user",
            'data': createUser
        })
    }
    login = async (req: Request, res: Response): Promise<Response> => {
        let {username , password} = req.body;
        const user = await db.user.findOne({
            where : {username}
        });

        //check password
        let check = await Authentication.passwordCompare(password,user.password);

        //generate token
        if (check) {
            let token = Authentication.generateToken(user.id,username,password);
            return res.send({
                token
            });
        }

        return res.send("auth failed");
    }

    profile = (req:Request,res:Response):Response =>{
        return res.send(req.app.locals.credential);
    }
}

export default new AuthController();
