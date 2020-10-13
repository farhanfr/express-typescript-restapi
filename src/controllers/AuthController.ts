import { Request, response, Response } from 'express';
import PasswordHash from '../utils/PasswordHash';

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
    login(req: Request, res: Response): Response {
        return res.send("create success");
    }
}

export default new AuthController();
