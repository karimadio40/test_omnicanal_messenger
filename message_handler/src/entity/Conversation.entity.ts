import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { MasterEntity } from "./Base.entity"
import { CHANNEL_TYPE, CONVERSION_STATUS } from "../constants/conversation.constant"
import { Staff } from "./Staff.entity"

export abstract class CustomerInfo {
    firstName: string
    email: string
    phoneNumber: string
    lastName: string
}

@Entity()
export class Conversation extends MasterEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column({ type: "json", })
    customerInfo: CustomerInfo
    @ManyToOne(() => Staff, (staff) => staff.conversations)
    staff: Staff
    @Column({
        type: "enum",
        enum: CHANNEL_TYPE,
        nullable:false
    })
    channelType: CHANNEL_TYPE
    @Column({
        type: "enum",
        enum: CONVERSION_STATUS,
        default: CONVERSION_STATUS.ACTIVE
    })
    status: CONVERSION_STATUS
}