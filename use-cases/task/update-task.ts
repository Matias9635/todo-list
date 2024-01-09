import { TaskRepository } from "../../adapters/repositories/task-repository";
import { TaskEntity } from "../../entities/task";

export const updateTask = async (repository: TaskRepository, taskId: number, taskUpdates: Partial<TaskEntity>) => {
    await repository.updateTask(taskId, taskUpdates);
}
