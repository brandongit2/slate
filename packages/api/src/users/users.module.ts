import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm"

import {UserDb} from "./entities/userDb.entity"
import {UsersResolver} from "./users.resolver"
import {UsersService} from "./users.service"

@Module({
  imports: [TypeOrmModule.forFeature([UserDb])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
