import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_, context: ExecutionContext): number => {
    const req = context.switchToHttp().getRequest();
    return req.user['sub'];
  },
);
