
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
import UserEntity from "../resources/user/user.entity.js";
dotenv.config();
const URI = process.env.NODE_ENV.trim() == 'test' ?process.env.MONGODB_URL_TEST :process.env.MONGODB_URL;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "photourl",
    entities:[UserEntity],
    synchronize: true,
    extra: {
        charset: "utf8mb4_unicode_ci"
    }
})

export default function(){ AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}