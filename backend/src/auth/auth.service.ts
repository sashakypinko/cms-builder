import {BadRequestException, ForbiddenException, Inject, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {InjectModel} from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import {Model} from "mongoose";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthRequestDto} from "./dto/auth-request.dto";
import {Auth, AuthDocument} from "./schemas/auth.schema";
import {ErrorMessagesEnum} from "./enums/error.messages.enum";
import {ErrorCodesEnum} from "./enums/error.codes.enum";
import {AuthResponseDto} from "./dto/auth-response.dto";
import {IMailService, MAIL_SERVICE} from "../mail/mail-service.interface";
import {UserDocument} from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
      @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
      @Inject(MAIL_SERVICE) private readonly mailService: IMailService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.usersService.findByEmail(
        createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException(ErrorMessagesEnum.USER_ALREADY_EXISTS, ErrorCodesEnum.USER_ALREADY_EXISTS);
    }

    const hash = await this.hashData(createUserDto.password);
    const verificationCode = uuidv4();

    const newUser = await this.usersService.create({
      ...createUserDto,
      verificationCode,
      password: hash,
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify?code=${verificationCode}`;

    await this.mailService.send({
      to: newUser.email,
      subject: 'Verification Link',
      html: `<a href="${verificationLink}">Verify Email</a>`
    });

    return newUser;
  }

  async signIn(data: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException(ErrorMessagesEnum.USER_NOT_FOUND, ErrorCodesEnum.USER_NOT_FOUND);
    }

    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches) {
      throw new BadRequestException(ErrorMessagesEnum.PASSWORD_INCORRECT, ErrorCodesEnum.PASSWORD_INCORRECT);
    }

    if (!user.verified) {
      throw new BadRequestException(ErrorMessagesEnum.EMAIL_NOT_VERIFIED, ErrorCodesEnum.EMAIL_NOT_VERIFIED);
    }

    if (!user.isActive) {
      throw new BadRequestException(ErrorMessagesEnum.USER_INACTIVE, ErrorCodesEnum.USER_INACTIVE);
    }


    const tokens = await this.createAuth(user._id);

    return {...tokens, user};
  }

  async logout(authId: string) {
    await this.deactivateAuth(authId);
  }

  async refreshTokens(authId: string, refreshToken: string) {
    const auth = await <AuthDocument | any>this.authModel.findById(authId);
    if (!auth || !auth.refreshToken)
      throw new ForbiddenException(ErrorMessagesEnum.ACCESS_DENIED, ErrorCodesEnum.ACCESS_DENIED);
    const refreshTokenMatches = await argon2.verify(
        auth.refreshToken,
        refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException(ErrorMessagesEnum.ACCESS_DENIED, ErrorCodesEnum.ACCESS_DENIED);
    const tokens = await this.getTokens(authId, auth.userId.toString());
    await this.authModel
        .findByIdAndUpdate(authId, {
          refreshToken: await this.hashData(tokens.refreshToken),
        })
        .exec();
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async verify(code: string) {
    const user: UserDocument = await this.usersService.findByVerificationCode(code);

    if (!user) {
      throw new BadRequestException(ErrorMessagesEnum.USER_NOT_FOUND, ErrorCodesEnum.USER_NOT_FOUND);
    }
    return this.usersService.update(user._id, {
      verificationCode: null,
      verified: true,
    })
  }

  async createAuth(userId: string) {
    const newAuth = <AuthDocument | any>new this.authModel({userId});
    const tokens = await this.getTokens(newAuth._id.toString(), userId);
    newAuth.refreshToken = await this.hashData(tokens.refreshToken);
    await newAuth.save();

    return tokens;
  }

  async deactivateAuth(id) {
    return this.authModel
        .findByIdAndUpdate(id, {
          isActive: false,
        })
        .exec();
  }

  async getTokens(authId: string, userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
          {
            authId,
            userId,
          },
          {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '60d',
          },
      ),
      this.jwtService.signAsync(
          {
            authId,
            userId,
          },
          {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '60d',
          },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
