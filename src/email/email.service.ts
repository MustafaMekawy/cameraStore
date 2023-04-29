import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendEmail(emailTo: string, subject: string, content: string) {
    try {
      const mail = await this.mailService.sendMail({
        to: emailTo,
        from: 'omaradmin@mailsac.com',
        subject,
        text: content,
      });
      // console.log(mail);

      return 'Email Sent Successfully';
    } catch (err) {
      throw err;
    }
  }
}
