import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NotificationDocument, Notification} from "./schemas/notification.schema";

@Injectable()
export class NotificationsService {
    constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

}
