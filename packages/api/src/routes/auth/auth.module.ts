import {Module} from "@nestjs/common"

import {UsersModule} from "$routes/users/users.module"
import {AuthResolver} from "./auth.resolver"
import {AuthService} from "./auth.service"

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
