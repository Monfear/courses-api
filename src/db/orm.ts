import { DataSource } from "typeorm";

function connectOrm(): void {
    const dataSource: DataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'toor',
        port: 3306,
        database: 'my_db',
        ssl: true,
        entities: [],
        logging: true,
    });

    dataSource.initialize()
        .then((value: DataSource) => {
            console.log('[+] typeorm datasource initialized');
        })
        .catch((err: any) => {
            console.warn(`[-] ${err.message}`);
        });
};

export default connectOrm;

