import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { MasterEntity } from "./Base.entity"
import { Conversation } from "./Conversation.entity"

@Entity()
export class Staff extends MasterEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column({nullable:true})
    lastSignAt: Date
    @Column()
    email: string
    @OneToMany(() => Conversation, (conversation) => conversation.staff)
    conversations: Conversation[]
    @Column({nullable:true})
    phoneNumber: string
    @Column()
    password: string
    @Column({default: false})
    isVerify: boolean
    @Column()
    verificationCode: string
    @Column()
    salt: string
}
