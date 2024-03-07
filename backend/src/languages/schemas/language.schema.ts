import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type LanguageDocument = Language & Document;

@Schema({timestamps: true})
export class Language {
    @ApiProperty()
    @Prop({required: true, unique: true})
    code: string;

    @ApiProperty()
    @Prop({default: false})
    isActive: boolean;

    @ApiProperty()
    @Prop({default: false})
    isMain: boolean;

    @ApiProperty()
    @Prop({default: "{}"})
    translations: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
