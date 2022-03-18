import { User } from '../models/models'
import bcrypt from 'bcrypt'
import tokenService from './tokenService'
import UserDto from '../dtos/userDto'
import ApiError from '../error/ApiError'


class UserService {

  async registration(login: string, password: string, email: string) {
    const candidate = await User.findOne({ where: { email: email, login: login } })
    if (candidate) {
      throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует, адрес должен быть уникален`)
    }
    const hashPassword = await bcrypt.hash(password, 3)

    const user = await User.create({
      login: login,
      password: hashPassword,
      email: email,
      role: 'USER',
    })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }

  }


  async login(login: string, password: string) {
    const user = await User.findOne({ where: { login: login } })
    if (!user) {
      throw ApiError.badRequest(`Пользователя с логином ${login} не существует`)
    }
    let isPasswordEquals
    if (user.password) {
      isPasswordEquals = await bcrypt.compare(password, user.password)
    }
    if (!isPasswordEquals) {
      throw ApiError.badRequest(`Неверный пароль`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError()
    }
    const user = await User.findOne({ where: { id: userData.id } })
    if (!user) {
      return { user: UserDto, accessToken: '', refreshToken: ''}
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

}

export default new UserService()
