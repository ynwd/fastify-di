import { Connection, getConnection, Repository, ObjectType, EntitySchema } from 'typeorm'
import { createError } from './error'

export abstract class BasicService {
  private conn = getConnection()
  public getConnection (): Connection {
    return this.conn
  }

  public repo<Entity> (entityClass: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
    return this.conn.getRepository(entityClass)
  }

  public err (errorName: string, error: Error): Error {
    return createError(errorName, error)
  }

  public close (): void {
    this.conn.close()
  }
}
