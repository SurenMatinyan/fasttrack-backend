import { Request } from 'express'
import { UserRole } from '../enum/user.role';

export interface IUserToken extends Request {
    user: {
        email: string
        id: number
        role: "student" | "instructur" | "staff" | "admin",
        status: 0 | 1 | 2
    }
}



