import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  createAuth(@Body('') authCredential: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredential);
  }
}
