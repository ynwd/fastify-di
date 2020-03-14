import { BasicService, Service } from '../../core'
import { User } from './user.entity'
import { DeleteResult } from 'typeorm'

@Service()
export class UserService extends BasicService {
  public async register (payload: User): Promise<User> {
    try {
      const user = new User()
      if (!payload.email) throw new Error('Email empty')
      if (!payload.username) throw new Error('Username empty')
      if (!payload.password) throw new Error('Password empty')
      user.email = payload.email
      user.username = payload.username
      user.password = payload.password
      return this.repo(User).save(user)
    } catch (error) {
      throw this.err('USER_REGISTER_ERROR', error)
    }
  }

  public async getAllUser (): Promise<User[]> {
    try {
      return this.repo(User).find({
        select: ['id', 'username', 'email']
      })
    } catch (error) {
      throw this.err('GET_ALL_USER_ERROR', error)
    }
  }

  public async deleteAll (): Promise<DeleteResult|undefined> {
    try {
      return this.repo(User).delete({})
    } catch (error) {
      throw this.err('DELETE_ALL_USER_ERROR', error)
    }
  }
}
