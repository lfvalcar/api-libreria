import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/entities/user.repository';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository){}

  async register(RegisterAuthDto: RegisterAuthDto){
  }

  async login(LoginAuthDto: LoginAuthDto){
  }
}
