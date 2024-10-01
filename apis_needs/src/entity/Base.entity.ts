import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class MasterEntity {
    @Column({ default: false })
    delete: boolean;
    @Column({ default: true })
    enable: boolean;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    modifiedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
}