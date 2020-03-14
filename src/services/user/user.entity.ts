import { Entity, Column, Index } from 'typeorm'
import { BasicEntity } from '../../core'

@Entity()
@Index(['id', 'email', 'username'])
export class User extends BasicEntity {
  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username?: string

  @Column()
  password?: string
}

/* Advance class
import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm'
import { Model } from '../../lib/Model'

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

@Entity()
@Index(['id', 'permissionName'])
export class Permission extends Model {
  @Column()
  permissionName: string

  @Column()
  creator: string

  @Column()
  role: Role

  @ManyToMany(() => User, user => user.permissions)
  users: User[]
}

@Entity()
@Index(['id', 'email', 'username'])
export class User extends Model {
  @Column({ unique: true })
  email: string

  @Column()
  password?: string

  @Column({ unique: true })
  username?: string

  @ManyToMany(() => Permission, permission => permission.users, {
    cascade: true
  })
  @JoinTable({
    name: 'user_permission'
  })
  permissions?: Permission[]
} */
