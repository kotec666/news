import { NextFunction, Request, Response } from 'express'
import userService from '../service/userService'

class UserController {

  async registration(req: Request, res: Response, next: NextFunction) {

    try {
      const { login, password, email } = req.body
      const userData = await userService.registration(login, password, email)
      res.cookie(
        'refreshToken',
        userData.refreshToken,
        {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
          //  secure: true (for https connection)
        })
      return res.json(userData)
    } catch (e) {
      next(e)
    }

  }

  async login(req: Request, res: Response, next: NextFunction) {

    try {
      const { login, password } = req.body
      const userData = await userService.login(login, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) //  secure: true (for https connection)})
      return res.json(userData)
    } catch (e) {
      next(e)
    }

  }

  async refresh(req: Request, res: Response, next: NextFunction) {

    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken,
        {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
          //  secure: true (for https connection)
        })
      return res.json(userData)
    } catch (e) {
      next(e)
    }

  }

  async logout(req: Request, res: Response, next: NextFunction) {

    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }

  }


}

export default new UserController()
