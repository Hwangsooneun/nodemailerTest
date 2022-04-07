import { Controller, Get } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Controller('users')
export class UsersController {
  constructor(private readonly emailService: EmailService) {}

  @Get('signup')
  async join() {
    const success = await this.emailService.signup(
      'catalyst88492345245245@gmail.com',
    );
    console.log(success);
    if (success) {
      return 'signup';
    } else {
      return 'error';
    }
  }

  @Get('signin')
  async signin() {
    await this.emailService.signin('catalyst88@naver.com');
    return 'signin';
  }
}
