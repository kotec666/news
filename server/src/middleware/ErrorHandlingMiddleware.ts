import { NextFunction, Request, Response } from 'express'
import ApiError from './../error/ApiError'


interface IErr {
  status: number
  message: string
}

class errorHandlingMiddleware {
  errorHandling (err: IErr, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'непредвиденная ошибка'})
  }
}


export default new errorHandlingMiddleware()
