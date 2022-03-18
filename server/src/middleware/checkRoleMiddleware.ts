import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'
import ApiError from '../error/ApiError'
import tokenService from '../service/tokenService'

declare module 'jsonwebtoken' {
  export interface IUserJWT extends jwt.JwtPayload {
    id: number
    login: string
    email: string
    role: string
    pseudonym: string
    isActivated: boolean
    activationLink: string
  }
}

export interface IAuthUserRequest extends Request {
  user: jwt.IUserJWT
}

class checkRoleMiddleware {

  checkRole (roles: Array<string>) {
    return function(req: Request, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
        next()
      }
      try {

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const token = req.headers.authorization.split(' ')[1]  // Bearer jsakldjklasjlk
          if (!token) {
            return next(ApiError.unauthorizedError())
          }

          const userData = tokenService.validateAccessToken(token)
          if (!userData) {
            return next(ApiError.unauthorizedError())
          }

          if (!roles.includes(userData.role)) {
            return res.status(403).json({ message: 'Нет доступа' })
          }

          //@ts-ignore
          req.user = userData
          next()
        } else {
          return next(ApiError.unauthorizedError())
        }

      } catch (e) {
        return next(ApiError.unauthorizedError())
      }
    }
  }
}

export default new checkRoleMiddleware()
