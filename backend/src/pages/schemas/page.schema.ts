import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../languages/schemas/language.schema';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
  readonly languageId: Language;

  @ApiProperty()
  @Prop({ type: Object, required: true })
  data: Record<string, any>;
}

export const PageSchema = SchemaFactory.createForClass(Page);
