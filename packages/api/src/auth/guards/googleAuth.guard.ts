import {FastifyExecutionContext} from "@api/src/FastifyContext"

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  async canActivate(context: FastifyExecutionContext) {}
}
