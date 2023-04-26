import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

export const JWT = 'jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret-key',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
