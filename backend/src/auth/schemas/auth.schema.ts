import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ required: true })
  refreshToken: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
