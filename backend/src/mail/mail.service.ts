import { Injectable } from '@nestjs/common';
import { IMailService } from './mail-service.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  async send({ to, subject, html }) {
    return this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }
}
