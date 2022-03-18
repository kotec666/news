import { UserInstance } from '../models/interfaces'

export interface IUser extends Omit<UserInstance, 'password'> {}

class UserDto {
  id: number
  login: string
  email: string
  role: string

  constructor(model: IUser) {
      this.id = model.id
      this.login = model.login
      this.email = model.email
      this.role = model.role
  }

}

export default UserDto
