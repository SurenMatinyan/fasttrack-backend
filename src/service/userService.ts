import { Request } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserStatus } from '../enum/user.status'
import { UserRole } from '../enum/user.role'
import { IUserToken } from '../interface/user-token'

class UserService {

    constructor(private readonly  user = User, 
        private readonly jwtSer = jwt,
        private readonly connection = getRepository
    ) { }

    public async registration(req: Request) {
        try {
            if(req.body.role === UserRole.staff || req.body.role === UserRole.student){
                if(!!!req.body.skills || !!!req.body.skills[0]) throw new Error("skill not selected")
            }
            if (!!await this.connection(this.user).findOne({email: req.body.email})) throw new Error("such user exists")
            const hash = await bcrypt.hash(req.body.password, process.env.SALTROUND || 10);
            const create = await this.connection(this.user).save({
                ...req.body,
                password: hash,
                status: UserStatus.pending,
                rank: 0,
            })
            if (create) return {message: "your request has been sent"}
            throw new Error("Something went wrong")
        }
        catch (e) {
            return {message: e.message, status: 400}
        }
    }

    public async authorization (req: Request) {
        try{
            const check = await this.connection(this.user).findOne({email: req.body.email, status: UserStatus.approved})
            if(check){
                const checkPassword = await bcrypt.compare(req.body.password, check.password);
                if(checkPassword){
                    return {message: 'ok', token: this.genereteToken(check)}
                }
                throw new Error()
            }
            throw new Error()
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }

    public async adminAuth (req: Request) {
        try{
            const check = await this.connection(this.user).findOne({email: req.body.email, role: UserRole.admin})
            if(!check) throw new Error("authorization failed")
                const checkPassword = await bcrypt.compare(req.body.password, check.password);
            if(checkPassword){
                return {message: 'ok', token: this.genereteToken(check)}
            }
            throw new Error()
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }
    
    public async acceptOrReject(req: Request){
        try{
            const {id, status} = req.body
            const changeStatus = await this.connection(this.user).update({id, status: UserStatus.pending}, {status})
            if(changeStatus) return {message: 'update user status', status: 200}
            throw new Error()
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }

    public async getAllRequest(req: Request) {
        try{
            const allRequest = await this.connection(this.user).createQueryBuilder("user")
                .select(['user.id', 'user.name', 'user.lastname', 'user.rank', 'user.role', 'user.status', 'skill.name'])
                .where('user.status = :status', {status: UserStatus.pending})
                .innerJoin("user.skills", 'skill')
                .getMany()
            if(allRequest) return allRequest
            return {message: "not new request", status: 200}
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }

    

    private genereteToken(user: User){
        return  this.jwtSer.sign({email: user.email, id: user.id, role: user.role, status: user.status}, process.env.JWTPASSWORD!, {
            expiresIn: '6h',
        } ) 
    }

    public async verifyJWTToken(token: string): Promise<{status: number}>{
        return await this.jwtSer.verify(token, process.env.JWTPASSWORD!) as any
    }

    public async myPage(req: any) {
        try{
            const {id} = req.user
            return await this.connection(this.user).createQueryBuilder('user')
            .where('user.id = :id', {id})
            .select(['user.id', 'user.name', 'user.lastname', 'user.email', 'user.rank', 'user.role', 'skill.name',])
            .innerJoin('user.skills', 'skill')
            .getOne()
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }

    public async profile(req: Request){
        try{
            const {id} = req.params
            return await this.connection(this.user).createQueryBuilder('user')
            .where('user.id = :id', {id})
            .select(['user.id', 'user.name', 'user.lastname', 'user.rank', 'user.role', 'skill.name',])
            .innerJoin('user.skills', 'skill')
            .getOne()
        }
        catch(e){
            return {
                message: "Server Error",
                status: 500
            }
        }
    }


}

export default new UserService()