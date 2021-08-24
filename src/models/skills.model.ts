import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.model"

@Entity({name: "skills", synchronize: true})
export class Skills {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => User, user => user.skills, { cascade: true })
    @JoinTable({
        name: "users_skills",
        joinColumns: [
            {
                name: 'skills_id',
                referencedColumnName: "id"
            }
        ],
        inverseJoinColumns: [
            {
                name: 'users_id',
                referencedColumnName: "id"
            }
        ]
    })
    user: User[] 
}