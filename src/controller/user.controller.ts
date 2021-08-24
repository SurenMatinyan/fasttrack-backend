import userService from "../service/userService";
import { NextFunction, Request, Response } from 'express'

export default class UserController {

    static async registration(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await userService.registration(req))
        }
        catch (e) {
            next({
                status: 500
            })
        }
    }

    static async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await userService.authorization(req))
        }
        catch (e) {
            next({
                status: 500
            })
        }
    }

    static async acceptOrReject(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await userService.acceptOrReject(req))
        }
        catch (e) {
            next({
                status: 500
            })
        }
    }

    static async getAllRequest(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await userService.getAllRequest(req))
        }
        catch (e) {
            next({
                status: 500
            })
        }
    }


}