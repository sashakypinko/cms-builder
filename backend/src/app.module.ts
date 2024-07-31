import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LanguagesModule } from './languages/languages.module';
import { CoreModule } from './core/core.module';
import { RolesModule } from './roles/roles.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WsModule } from './ws/ws.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT),
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      },
      defaults: {
        from: `"${process.env.APP_NAME}" <${process.env.MAILTRAP_SENDER}>`,
      },
    }),
    CoreModule,
    WsModule,
    FilesModule,
    AuthModule,
    RolesModule,
    LanguagesModule,
    MailModule,
    NotificationsModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
