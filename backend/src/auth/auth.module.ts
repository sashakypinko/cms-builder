import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {Auth, AuthSchema} from "./schemas/auth.schema";
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth.guard";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        ConfigModule.forRoot(),
        UsersModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {
}
