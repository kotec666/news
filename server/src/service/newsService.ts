import {News} from '../models/models'
import ApiError from '../error/ApiError'
import path from 'path'
import * as uuid from 'uuid'

class NewsService {

    async addNews(newsTitle: string, newsBody: string, userId: number, files: any) {

        const generateName = () => {
            return uuid.v4() + '.png'
        }

        const imageUrl = generateName()

        await files.newsPicture.mv(path.resolve(__dirname, '..', 'static', imageUrl))

        const news = await News.create({title: newsTitle, body: newsBody, userId: userId, imageUrl: imageUrl})
        return {news: news}
    }

    async deleteNews(newsId: number, user: any) {
        const news = await News.findOne({where: {id: newsId}})
        if (!news) {
            throw ApiError.badRequest(`Новости с id: ${newsId} не существует`)
        }
        if (user.role === 'ADMIN' || news.userId === user.id) {
            await news.destroy()
            return {status: 204}
        } else {
            return {status: 404}
        }
    }


    async change(newsTitle: string, newsBody: string, newsId: number, files: any) {

        const generateName = () => {
            return uuid.v4() + '.png'
        }

        const imageUrl = generateName()

        await files.newsPicture.mv(path.resolve(__dirname, '..', 'static', imageUrl))

        const news = await News.findByPk(newsId)
        if (news) {
            news.title = newsTitle
            news.body = newsBody
            news.imageUrl = imageUrl
            await news.save()
        }
        return {news: news}
    }


    async getAll() {
        const news = await News.findAll()
        return news
    }


}

export default new NewsService()
