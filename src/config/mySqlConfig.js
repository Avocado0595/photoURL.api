import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
export default pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:process.env.DB_PASSWORD,
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

