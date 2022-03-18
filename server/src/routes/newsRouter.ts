import express from 'express'

const router = express.Router()

import newsValidator from '../validators/newsValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import newsController from '../controllers/newsController'

router.post(
    '/add',
    checkRoleMiddleware.checkRole(['ADMIN']),
    newsValidator.checkCreateNews(),
    expressValidatorMiddleware.handleValidationError,
    newsController.addOne
)

router.delete(
    '/delete',
    checkRoleMiddleware.checkRole(['ADMIN']),
    newsValidator.checkDeleteNews(),
    expressValidatorMiddleware.handleValidationError,
    newsController.deleteOne
)


router.get(
    '/get',
    newsController.getAll
)

router.put(
    '/change',
    checkRoleMiddleware.checkRole(['ADMIN']),
    newsValidator.checkChangeNews(),
    expressValidatorMiddleware.handleValidationError,
    newsController.ChangeOne
)

export default router
