import { TaskRepository } from "../../adapters/repositories/task-repository";

export const deleteTask = async (repository: TaskRepository, taskId: number) => {
    await repository.deleteTask(taskId);
}
