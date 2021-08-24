import {Request} from 'express'
import { getRepository } from 'typeorm'
import { UserStatus } from '../enum/user.status'
import { Skills } from '../models/skills.model'

class SkillService {

    constructor(private readonly connection = getRepository,
            private readonly skill = Skills
        ){

    } 

    public async searchUsersBySkills(req: Request) {
        try{
            let {skills} = req.query as any
            skills = skills.split(" ").join("")
            skills = skills.toLowerCase()
            const users = await this.connection(this.skill).createQueryBuilder("skills")
                .leftJoin('skills.user', 'user')
                .where("user.status = :status", {status: UserStatus.approved})
                .andWhere('skills.name = :name', {name:skills})
                .select(["skills.name", "user.id", "user.surname as surname", "user.lastname as lastname", "user.rank as rank"])
                .getRawMany()
            if(users) {return users}
            return {message: "no user found"}
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }

    public async skillList() {
        try{
            const list = await this.connection(this.skill).find()
            return list
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }


}

export default new SkillService()