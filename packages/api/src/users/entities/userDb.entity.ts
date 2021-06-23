import {Column, Entity, ObjectIdColumn} from "typeorm"

@Entity({name: `users`})
export class UserDb {
  @ObjectIdColumn()
  id!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  email!: string

  @Column()
  password!: string
}
