import express from 'express'
const router = express.Router()

import newsRouter from './newsRouter'
import userRouter from './userRouter'


router.use('/news', newsRouter)
router.use('/user', userRouter)


export default router
