import { Connection, MysqlError } from 'mysql';

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

    addMultipleData: function (db: Connection, table: string, data: any[][]): void {
        const query: string = `INSERT INTO ${table} VALUES ?`;

        db.query(query, data, (error: MysqlError | null, result: any): void => {
            if (!error) {
                console.log(result);
            } else {
                console.warn(`[-] ${error.sqlMessage}`);
            };
        });
    },
};