import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MAIL_SERVICE } from './mail-service.interface';

const mailServiceProvider = {
  useClass: MailService,
  provide: MAIL_SERVICE,
};

@Module({
  providers: [mailServiceProvider],
  exports: [mailServiceProvider],
})
export class MailModule {}
