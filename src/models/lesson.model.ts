import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Course } from "./course.model";

@Entity({
    name: 'lessons',
})

export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    duration: string;

    @ManyToOne(() => Course, (course) => course.lessons)
    @JoinColumn({
        name: 'course_id'
    })
    course: Course;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};