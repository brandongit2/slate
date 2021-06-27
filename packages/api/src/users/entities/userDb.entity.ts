import {Column, Entity, ObjectIdColumn} from "typeorm"

@Entity({name: `users`})
export class UserDb {
  @ObjectIdColumn()
  _id!: string

  @Column()
  userId!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  email!: string

  @Column()
  password!: string
}
