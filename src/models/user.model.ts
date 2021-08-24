import { Column, Entity, ManyToMany, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user.role";
import { Skills } from "./skills.model";


@Entity({name: "users", synchronize: true})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    surname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({})
    rank: string

    @Column()
    role: UserRole

    @Column()
    status: number

    @ManyToMany(() => Skills, skills => skills.user)
    skills: Skills[]
}