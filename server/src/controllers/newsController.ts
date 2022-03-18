import { NextFunction, Request, Response } from 'express'
import newsService from '../service/newsService'

class NewsController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { newsTitle, newsBody, userId } = req.body
      const files = req.files

      if (!files) {
        return res.status(204).json('Загрузите изображение плиз')
      }

      const news = await newsService.addNews(newsTitle, newsBody, +userId, files)
      return res.json(news)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { newsId } = req.body
      // @ts-ignore
      const { user } = req

      if (!user) {
        return res.json('Пользователя нет')
      } else {
        const news = await newsService.deleteNews(+newsId, user)
        return res.json(news)
      }
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await newsService.getAll()
      return res.json(news)
    } catch (e) {
      next(e)
    }
  }

  async ChangeOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { newsTitle, newsBody, newsId } = req.body
      const files = req.files

      if (!files) {
        return res.status(204).json('Загрузите изображение плиз')
      }

      const news = await newsService.change(newsTitle, newsBody, +newsId, files)
      return res.json(news)
    } catch (e) {
      next(e)
    }
  }


}

export default new NewsController()
