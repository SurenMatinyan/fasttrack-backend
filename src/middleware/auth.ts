
import { Response, NextFunction } from 'express'
import userService from '../service/userService'
import { IUserToken } from '../interface/user-token'
import { UserStatus } from '../enum/user.status'

export default async (req: IUserToken, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization']
        if (!authorization) throw new Error("no token")
        const bearer = authorization.split(' ')[0]
        const token = authorization.split(' ')[1]
        if(bearer !== 'Bearer' || !token){
            throw new Error('not authorization')
        }
        const user  = await userService.verifyJWTToken(token)
        if(user.status !== UserStatus.approved)  throw new Error(); 
        req.user = user as any
        next()
    }
    catch (e) {
       res.json({message: e.message, status: 403})
    }
}