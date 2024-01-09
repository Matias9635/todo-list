import express, { Router } from "express";
import { TaskController } from "../../../adapters/controllers/task-controller";
import { TaskRepository } from "../../../adapters/repositories/task-repository";
import { Task } from "../../orm/models/task";
import { AppDataSource } from "../../orm/typeorm";

export const taskRouter = async () => {
    const router: Router = express.Router();

    //dbRepository is typeORM's repository.
    const dbRepository = AppDataSource.getRepository(Task);

    const taskRepository = TaskRepository.getInstance();
    taskRepository.setDbRepository(dbRepository);

    const taskController = new TaskController(taskRepository);

    router.get('/', taskController.getTasks.bind(taskController));

    router.route('/').post(taskController.createTask.bind(taskController));

    router.route('/:id').put(taskController.updateTask.bind(taskController));

    router.route('/:id').delete(taskController.deleteTask.bind(taskController));

    return router;
}