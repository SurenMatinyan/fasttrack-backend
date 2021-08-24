import express, { Application } from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv'
import userRouter from './router/user.router';
import skillRouter from './router/skills.router';
import db from './config/connect.db'
import errorHandler from './middleware/error';
db
dotenv.config()

const app: Application = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/skill', skillRouter)



app.use(errorHandler)
app.get('*', async (req, res) => {
    res.status(404).json({
      error: 404
    })
  })
app.listen(process.env.PORT || 3000, () => console.log(`connected in port ${process.env.PORT || 3000}`))