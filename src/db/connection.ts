import mysql from 'mysql';

function connectDB(): mysql.Connection {
    const db: mysql.Connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    db.connect((err: mysql.MysqlError): void => {
        if (!err) {
            console.log('[+] db connected');
        } else {
            console.log(`[-] ${err.message}`);
        };
    });

    return db;
};

export default connectDB;