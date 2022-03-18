import { Model } from 'sequelize'

export interface TokenInstance extends Model {
  id: number
  refreshToken: string
}

export interface UserInstance extends Model {
  id: number
  login: string
  password: string
  email: string
  role: string
}

export interface NewsInstance extends Model {
  id: number
  title: string
  body: string
  imageUrl: string
  userId: number
}
