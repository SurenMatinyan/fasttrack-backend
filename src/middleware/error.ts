import { NextFunction, Request, Response,ErrorRequestHandler } from 'express'
import {ValidationError} from 'express-validation'

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    
  const {status = 500, message = 'Server Error'} = err
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(status)
    .json({message})
}