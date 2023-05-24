import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { Lesson } from "./lesson.model";
import { Author } from "./author.model";

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

    @Column()
    level: string;

    @OneToMany(() => Lesson, (lesson) => lesson.course)
    lessons: Lesson[];

    @ManyToMany(() => Author, { cascade: true })
    authors: Author[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};