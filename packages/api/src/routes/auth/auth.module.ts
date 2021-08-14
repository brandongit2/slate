import {Module} from "@nestjs/common"

import {UserModule} from "#/routes/user/user.module"
import {AuthResolver} from "./auth.resolver"
import {AuthService} from "./auth.service"

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
