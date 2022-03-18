import express from 'express'
const router = express.Router()
import UserValidator from './../validators/userValidator'
import userController from '../controllers/userController'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'

router.post(
  '/registration',
        UserValidator.checkCreateUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.registration
)
router.post(
       '/login',
        UserValidator.checkLoginUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.login
)
router.post(
  '/logout',
        UserValidator.checkLogoutUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.logout
)

router.get(
  '/refresh',
        UserValidator.checkRefreshUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.refresh
)


export default router
