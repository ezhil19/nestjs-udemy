import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredential: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredential;
    const userCrd = this.create({ username, password });
    await this.save(userCrd);
  }
}
