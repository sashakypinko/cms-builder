import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Notification, NotificationSchema} from './schemas/notification.schema';
import {NotificationsController} from "./notifications.controller";
import {NotificationsService} from "./notifications.service";
import {NotificationsGateway} from "./notifications.gateway";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
