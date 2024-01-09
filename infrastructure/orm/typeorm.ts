import { DataSource } from "typeorm";
import { Task } from "./models/task";
import { TaskCount } from "./models/task_count";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Task, TaskCount],
    subscribers: [],
    migrations: [],
});