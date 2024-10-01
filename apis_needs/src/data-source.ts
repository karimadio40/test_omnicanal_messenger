import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "omnicanal_messenger",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [],
    subscribers: [],
})
