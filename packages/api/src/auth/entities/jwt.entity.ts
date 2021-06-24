import {Column, Entity, ObjectIdColumn} from "typeorm"

/**
 * A blacklisted JWT.
 */
@Entity({name: `jwts`})
export class JwtDb {
  @ObjectIdColumn()
  jwt!: string

  @Column()
  blacklistedDate!: Date
}
