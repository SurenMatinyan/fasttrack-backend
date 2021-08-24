import { NextFunction, Response } from "express"
import { IUserToken } from "../interface/user-token"

export default async (req: IUserToken, res: Response, next: NextFunction) => {
    try {
       if(req.user.role !== 'admin'){
          throw new Error("Forbidden no admin") 
       }
        next()
    }
    catch (e) {
        res.json({message: e.message, status: 403})
    }
}