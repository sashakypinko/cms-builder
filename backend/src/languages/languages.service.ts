import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Language, LanguageDocument} from "./schemas/language.schema";

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private languageModel: Model<LanguageDocument>) {}

  async findAll(): Promise<LanguageDocument[]> {
    return this.languageModel.find().exec();
  }

  async findByCode(code: string): Promise<LanguageDocument> {
    return this.languageModel.findOne({code});
  }

  async create(createLanguageDto: CreateLanguageDto): Promise<LanguageDocument> {
    const languagesCount = await this.languageModel.count();
    const createdLanguage = new this.languageModel({
      ...createLanguageDto,
      isMain: !languagesCount,
    });
    return createdLanguage.save();
  }


  async update(id: string, updateLanguageDto: UpdateLanguageDto): Promise<LanguageDocument> {
    return this.languageModel
        .findByIdAndUpdate(id, updateLanguageDto, {new: true})
        .exec();
  }

  async remove(id: string): Promise<LanguageDocument> {
    return this.languageModel.findByIdAndDelete(id).exec();
  }

  async removeByIds(ids: Array<string>): Promise<LanguageDocument[]> {
    await this.languageModel.deleteMany({_id: {$in: ids}}).exec();
    return this.findAll();
  }

  async removeTranslationKey(keys: string[]): Promise<LanguageDocument[]> {
    const allLanguages = await this.findAll();

    const updateOperations = allLanguages.map(async (language) => {
      const parsedTranslations = JSON.parse(language.translations);

      for (const key of keys) {
        delete parsedTranslations[key];
      }

      await this.languageModel.updateOne({ _id: language._id }, {
        translations: JSON.stringify(parsedTranslations)
      });
    });

    await Promise.all(updateOperations);

    return this.findAll();
  }
}
