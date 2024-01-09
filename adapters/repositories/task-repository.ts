import { EntityNotFoundError, Repository } from "typeorm";
import { TaskEntity } from "../../entities/task";
import { Task } from "../../infrastructure/orm/models/task";

export class TaskRepository {
    private static _instance: TaskRepository;
    private dbRepository: Repository<Task>;

    constructor() {}

    static getInstance(): TaskRepository {
        if (!this._instance) {
            this._instance = new TaskRepository();
        }

        return this._instance;
    }

    setDbRepository(dbRepository: Repository<Task>) {
        this.dbRepository = dbRepository;
    }

    async getTasks(): Promise<Task[]> {
        const tasks = await this.dbRepository
            .createQueryBuilder('t')
            .getMany();

        return tasks;
    }

    async createTask(task: TaskEntity): Promise<TaskEntity> {
        await this.dbRepository.insert(task);
        return task;
    }

    async deleteTask(taskId: number): Promise<void> {
        const exists = await this.dbRepository.existsBy({id: taskId});
        if (!exists) {
            throw new EntityNotFoundError(TaskEntity, {id: taskId});
        }
        await this.dbRepository.softDelete({id: taskId});
    }

    async updateTask(taskId: number, taskUpdates: Partial<TaskEntity>): Promise<void> {
        const exists = await this.dbRepository.existsBy({id: taskId});
        if (!exists) {
            throw new EntityNotFoundError(TaskEntity, {id: taskId});
        }

        const updatedTask = await this.dbRepository.update({id: taskId}, taskUpdates);

        console.log(updatedTask.generatedMaps);
    }
}