import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async _send(
    tos: string[],
    subject: string,
    templateName: string,
    context: any = {},
  ): Promise<boolean> {
    await this.mailerService.sendMail({
      to: tos.join(', '),
      subject,
      template: `./src/templates/${templateName}`,
      context,
    });

    return true;
  }

  async signin(to: string) {
    await this._send([to], '로그인 시도', 'signin.ejs', {
      email: to,
      datetime: new Date(),
    });
  }

  async signup(to: string) {
    try {
      return await this._send([to], '회원가입 완료', 'signup.ejs', {
        email: to,
        authNumber: 234534,
      });
    } catch {
      ('에러');
      return 'error';
    }
  }
}
