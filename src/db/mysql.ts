import { Connection, MysqlError, createConnection } from 'mysql';

export function connectMySQL(): Connection {
    const db: Connection = createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    db.connect((err: MysqlError): void => {
        if (!err) {
            console.log('[+] mysql connected');
        } else {
            console.log(`[-] ${err.message}`);
        };
    });

    return db;
};

export const queries = {
    makeQuery: function (db: Connection, query: string): void {
        db.query(query, (error: MysqlError, result: any): void => {
            if (!error) {
                console.log(result);
            } else {
                console.warn(`[-] ${error.sqlMessage}`);
            };
        });
    },

    addSingleData: function (db: Connection, table: string, data: any): void {
        const query: string = `INSERT INTO ${table} SET ?`;

        db.query(query, data, (error: MysqlError | null, result: any): void => {
            if (!error) {
                console.log(result);
            } else {
                console.warn(`[-] ${error.sqlMessage}`);
            };
        });
    },
};