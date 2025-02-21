import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import * as bycrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  signUp(authCredential: AuthCredentialDto): Promise<void> {
    return this.usersRepository.createUser(authCredential);
  }
  sigIn(authCredential: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredential;
    const user = await this.usersRepository.findOne(username);
    if (user && (await bycrypt)) {
    }
  }
}
