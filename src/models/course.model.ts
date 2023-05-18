import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { Lesson } from "./lesson.model";

@Entity({
    name: 'courses',
})

export class Course extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    description: string;

    // @Column()
    // author: string;

    @Column()
    level: string;

    @OneToMany(() => Lesson, (lesson) => lesson.course)
    lessons: Lesson[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};