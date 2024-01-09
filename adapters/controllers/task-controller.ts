import { Request, Response } from "express";
import { TaskEntity } from "../../entities/task";
import { createTask } from "../../use-cases/task/create-task";
import { deleteTask } from "../../use-cases/task/delete-task";
import { listTasks } from "../../use-cases/task/list-tasks";
import { updateTask } from "../../use-cases/task/update-task";
import { TaskRepository } from "../repositories/task-repository";

export class TaskController {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async getTasks(req: Request, res: Response) {
        const tasks = await listTasks(this.taskRepository);
        return res.send(tasks);
    }

    async createTask(req: Request, res: Response) {
        const {name, completed, deadline} = req.body;

        const task = new TaskEntity();
        task.name = name;
        task.completed = completed;
        task.deadline = new Date(deadline);

        const newTask = await createTask(this.taskRepository, task);
        return res.send(newTask);
    }

    async deleteTask(req: Request, res: Response) {
        const {id} = req.params;

        await deleteTask(this.taskRepository, +id);
        return res.sendStatus(200);
        
    }

    async updateTask(req: Request, res: Response) {
        const {id} = req.params;
        const taskUpdates = req.body;

        await updateTask(this.taskRepository, +id, taskUpdates);
        return res.sendStatus(204);
    }
}