import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByVerificationCode(
    verificationCode: string,
  ): Promise<UserDocument> {
    return this.userModel.findOne({ verificationCode }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async activate(id: string): Promise<UserDocument> {
    await this.notificationsService.create({
      userId: id,
      title: 'User activate',
      content: 'You have been activated!',
    });
    return this.userModel.findByIdAndUpdate(id, { isActive: true }).exec();
  }

  async deactivate(id: string): Promise<UserDocument> {
    await this.notificationsService.create({
      userId: id,
      title: 'User deactivate',
      content: 'You have been deactivated!',
    });
    return this.userModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }
}
