import { body, cookie } from 'express-validator'

class UserValidator {
  checkCreateUser() {
    return [
      body('login')
        .notEmpty()
        .isLength({min: 3, max: 26}),
      body('email')
        .notEmpty()
        .isEmail()
        .isLength({min: 5, max: 55}),
      body('password')
        .notEmpty()
        .isLength({min: 5, max: 26})
    ]
  }

  checkLoginUser() {
    return [
      body('login')
        .notEmpty()
        .isLength({min: 3, max: 26}),
      body('password')
        .notEmpty()
        .isLength({min: 5, max: 26})
    ]
  }

  checkLogoutUser() {
    return [
      cookie('refreshToken')
        .notEmpty()
    ]
  }


  checkRefreshUser() {
    return [
      cookie('refreshToken')
        .notEmpty()
    ]
  }

}

export default new UserValidator()
