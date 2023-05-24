import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Course } from "./course.model";

@Entity({
    name: 'authors'
})

export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @ManyToMany(() => Course, { cascade: true })
    @JoinTable({
        name: 'authors_courses',
        joinColumn: {
            name: 'authors',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'courses',
            referencedColumnName: 'id'
        },
    })
    courses: Course[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};