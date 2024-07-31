import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationDocument,
  Notification,
} from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly wsGateway: WsGateway,
  ) {}

  async findAll(userId: string): Promise<NotificationDocument[]> {
    return this.notificationModel.find({ userId }).exec();
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    const createdNotification = await new this.notificationModel(
      createNotificationDto,
    ).save();

    this.wsGateway.sendMessage<Notification>(
      String(createdNotification.userId),
      createdNotification,
    );

    return createdNotification;
  }

  async remove(id: string): Promise<NotificationDocument> {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }

  async changeViewed(
    id: string,
    viewed: boolean,
  ): Promise<NotificationDocument> {
    return this.notificationModel.findByIdAndUpdate(id, { viewed }).exec();
  }
}
