import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import * as process from 'process';
import { setNestedValue } from '../common/helpers/object-helper';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async findAll(): Promise<PageDocument[]> {
    return this.pageModel.find().exec();
  }

  async create(
    createPageDto: CreatePageDto,
    files: Express.Multer.File[],
  ): Promise<PageDocument> {
    files.forEach((file) => {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = join(process.cwd(), 'uploads', fileName);
      fs.writeFileSync(filePath, file.buffer);
      const fileUrl = `${process.env.APP_URL}/files/${fileName}`;
      setNestedValue(createPageDto, file.fieldname, fileUrl);
    });

    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async update(
    id: string,
    updatePageDto: UpdatePageDto,
    files: Express.Multer.File[],
  ): Promise<PageDocument> {
    files.forEach((file) => {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = join(process.cwd(), 'uploads', fileName);
      fs.writeFileSync(filePath, file.buffer);
      const fileUrl = `${process.env.APP_URL}/files/${fileName}`;
      setNestedValue(updatePageDto, file.fieldname, fileUrl);
    });

    return this.pageModel
      .findByIdAndUpdate(id, updatePageDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PageDocument> {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async removeByIds(ids: Array<string>): Promise<PageDocument[]> {
    await this.pageModel.deleteMany({ _id: { $in: ids } }).exec();
    return this.findAll();
  }

  private processDataWithFiles(
    data: Record<string, any>,
    fileMap: Map<string, string>,
  ): Record<string, any> {
    const processObject = (obj: Record<string, any>) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          processObject(obj[key]);
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((item) => {
            if (typeof item === 'object') processObject(item);
            return item;
          });
        } else if (fileMap.has(obj[key])) {
          obj[key] = fileMap.get(obj[key]);
        }
      }
    };

    processObject(data);
    return data;
  }
}
