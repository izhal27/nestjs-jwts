import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './common/guards';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
