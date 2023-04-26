import { AuthGuard } from '@nestjs/passport';

import { JWT_REFRESH } from '../../auth/strategies/refresh-token.strategy';

export class RefreshTokenGuard extends AuthGuard(JWT_REFRESH) {
  constructor() {
    super();
  }
}
