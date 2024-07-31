import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [forwardRef(() => UsersModule)],
  exports: [WsGateway],
  providers: [WsGateway],
})
export class WsModule {}
