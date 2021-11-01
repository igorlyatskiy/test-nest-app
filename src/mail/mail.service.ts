import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {
    this.logger.log({
      user: this.configService.get('mail.username'),
      pass: this.configService.get('mail.password'),
    });
  }

  async sendVerificationEmail(
    email: string,
    id: string,
    activationCode: string,
  ) {
    const verificationUrl = `http://${this.configService.get(
      'app.host',
    )}:${this.configService.get('app.port')}/verify/${id}/${activationCode}`;

    return await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm registration ✔',
      text: '',
      html: `<b>Please, click the link below to confirm registration: </b><br><a target='_blank' href='${verificationUrl}'>${verificationUrl}</a>`,
    });
  }
}
