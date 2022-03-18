import jwt from 'jsonwebtoken'
import { UserInstance } from '../models/interfaces'
import { Token } from '../models/models'

interface IUser extends Omit<UserInstance, 'password'> {}

class TokenService {
  generateTokens(payload: {
    id: number
    login: string
    email: string
    role: string
  }) {
    const accessToken = jwt.sign(payload, `access`, {expiresIn:'30m'})
    const refreshToken = jwt.sign(payload, `refresh`, {expiresIn:'30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { userId: userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await Token.create({refreshToken, userId})
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({where: {refreshToken}})
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = <jwt.IUserJWT>jwt.verify(token, `access`)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = <jwt.IUserJWT>jwt.verify(token, `refresh`)
      return userData
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({where: {refreshToken}})
    return tokenData
  }

}

export default new TokenService()
