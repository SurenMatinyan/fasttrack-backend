import skillService from '../service/skillService'
import {NextFunction, Request, Response} from 'express'

export default class SkillController {

    static async searchUsersBySkills(req: Request, res: Response, next: NextFunction) {
        try{
            return res.status(200).json(await skillService.searchUsersBySkills(req))
        }
        catch(e){
            next({
                status: 500
            })
        }
    }

    static async skillList(req: Request, res: Response, next: NextFunction){
        try{
            return res.status(200).json(await skillService.skillList());
        }
        catch(e){
            next({
                status: 500
            })
        }
    }

}