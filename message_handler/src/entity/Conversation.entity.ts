import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { MasterEntity } from "./Base.entity"
import { CHANNEL_TYPE, CONVERSION_STATUS } from "../constants/conversation.constant"
import { Staff } from "./Staff.entity"

export abstract class CustomerInfo {
    @Column()
    firstName?: string
    @Column()
    email?: string
    @Column()
    phoneNumber?: string
    @Column()
    userName?: string
    @Column()
    lastName?: string
}

@Entity()
export class Conversation extends MasterEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    chatId: string
    @Column(() => CustomerInfo)
    customerInfo: CustomerInfo
    @ManyToOne(() => Staff, (staff) => staff.conversations)
    staff: Staff
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
    @Column()
    startTime: Date
    @Column()
    endTime: Date
}