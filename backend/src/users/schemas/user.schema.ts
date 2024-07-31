import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  lastName: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ default: false })
  verified: boolean;

  @ApiProperty()
  @Prop({ default: null })
  verificationCode: string | null;

  @ApiProperty()
  @Prop({ default: Role.MODERATOR, type: String, enum: Role })
  role: Role;

  @ApiProperty()
  @Prop({ default: false })
  isActive: boolean;

  @ApiProperty()
  @Prop({ default: null })
  avatar: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
