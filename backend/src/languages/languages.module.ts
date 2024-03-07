import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Language, LanguageSchema} from "./schemas/language.schema";
import {IsUniqueValidator} from "./validators/is-unique.validator";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }]),
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService, IsUniqueValidator]
})
export class LanguagesModule {}
