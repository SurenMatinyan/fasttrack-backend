import {createConnection} from "typeorm";
import { Skills } from "../models/skills.model";
import { User } from "../models/user.model";

export default   createConnection({
        type: "postgres",
        host: process.env.DATABASE_HOST || '127.0.0.1',
        port:  Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER || 'test12',
        password:  process.env.DATABASE_PASSWORD || '1234',
        database: process.env.DATABASE_DB || 'nest',
        entities: [User, Skills],
        synchronize: true
    }).then(res => console.log('connected database')).catch(err => console.log('not connected database', err.message));
