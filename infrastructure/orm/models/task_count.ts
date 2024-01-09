import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'task_count'})
export class TaskCount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    completed: number;

    @Column()
    notCompleted: number;
}