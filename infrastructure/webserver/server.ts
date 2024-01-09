import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import "reflect-metadata";
import { taskRouter } from "./routes/task-router";

export const createServer = async (): Promise<Express> => {
    const app: Express = express();

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    const taskRoutes = await taskRouter();
    app.use('/api/tasks', taskRoutes);

    return app;
}