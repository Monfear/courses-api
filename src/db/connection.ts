import mysql from 'mysql';

function connectDB(): mysql.Connection {
    const db: mysql.Connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'toor',
        database: 'my_db',
    });

    db.connect((err: mysql.MysqlError): void => {
        if (!err) {
            console.log('[+] db connected');
        } else {
            console.log(err.message);
        }
    });

    return db;
};

export default connectDB;