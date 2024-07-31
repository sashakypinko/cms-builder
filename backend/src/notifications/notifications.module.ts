import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module';
import { WsModule } from '../ws/ws.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    WsModule,
    forwardRef(() => UsersModule),
  ],
  exports: [NotificationsService],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
