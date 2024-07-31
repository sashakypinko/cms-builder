import { Global, Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RolesModule {}
