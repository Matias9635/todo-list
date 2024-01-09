import { TaskRepository } from "../../adapters/repositories/task-repository";
import { TaskEntity } from "../../entities/task";

export const createTask = async (repository: TaskRepository, task: TaskEntity) => {
    const newTask = await repository.createTask(task);
    return newTask;
}