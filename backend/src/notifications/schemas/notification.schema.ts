import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/schemas/user.schema";

export type NotificationDocument = Notification & Document;

@Schema({timestamps: true})
export class Notification {
    @ApiProperty()
    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    userId: User;

    @ApiProperty()
    @Prop({required: true})
    title: string;

    @ApiProperty()
    @Prop()
    content: string;

    @ApiProperty()
    @Prop()
    route: string;

    @ApiProperty()
    @Prop({default: false})
    viewed: boolean;

    @ApiProperty()
    @Prop({default: false})
    opened: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
