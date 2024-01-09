import { TaskRepository } from "../../adapters/repositories/task-repository";

export const listTasks = async (repository: TaskRepository) => {
    const tasks = await repository.getTasks();
    return tasks;
}
