import { configDotenv } from "../utils/dotenv";
import { DataSource } from "typeorm";
import { Course } from "../models/course.model";
import { Lesson } from "../models/lesson.model";
import { User } from "../models/user.model";
import { Author } from "../models/author.model";

configDotenv('orm.ts');

export const dataSource: DataSource = new DataSource({
    type: 'mysql',
    port: 3306,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    entities: [Course, Lesson, Author, User],
    synchronize: true,
    logging: true,
});

function connectOrm(): DataSource {
    dataSource.initialize()
        .then((value: DataSource) => {
            console.log('[+] typeorm datasource initialized');
        })
        .catch((err: any) => {
            console.warn(`[-] ${err.message}`);
        });

    return dataSource;
};

export default connectOrm;

