import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { MasterEntity } from "./Base.entity"
import { CHANNEL_TYPE, CONVERSION_STATUS, SENDER_TYPE } from "../constants/conversation.constant"
import { Staff } from "./Staff.entity"
import { Conversation } from "./Conversation.entity"

export abstract class CustomerInfo {
    firstName: string
    email: string
    phoneNumber: string
    lastName: string
}

@Entity()
export class Message extends MasterEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    body: string
    @Column()
    sender: string
    @Column()
    receiver: string
    @Column({
        type: "enum",
        enum: SENDER_TYPE,
        default: SENDER_TYPE.CUSTOMER
    })
    senderType: string
    @Column({
        type: "enum",
        enum: SENDER_TYPE,
        default: SENDER_TYPE.STAFF
    })
    receiverType: string
    @OneToOne(()=>Conversation)
    conversation: Conversation
    @Column({default:false})
    delete: boolean

    @Column({
        type: "enum",
        enum: CHANNEL_TYPE,
        nullable: false
    })
    channelType: CHANNEL_TYPE
    @Column({
        type: "enum",
        enum: CONVERSION_STATUS,
        default: CONVERSION_STATUS.ACTIVATE
    })
    status: CONVERSION_STATUS
}