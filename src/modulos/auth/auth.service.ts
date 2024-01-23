import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/entities/user.repository';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
    ){}

  async register(registerDto: RegisterAuthDto){
    console.log(registerDto)
    // const { username, email, password} = registerDto; // operador destructuracion
    // const { email, ...resto} = registerDto; // ... operador spread
    // return registerDto;
    if (await this.userRepository.findByEmail(registerDto.email)){
      throw new BadRequestException('El email existe en la Base de Datos')
      // ABORTA la función register y NO CONTINUA
    }

    if (await this.userRepository.findByUsername(registerDto.username)){
      throw new BadRequestException('El usuario existe en la Base de Datos')
      // ABORTA la función register y NO CONTINUA
    }

    console.log('el email', registerDto.email, ' no existe en la BD');
    console.log('el usuario', registerDto.username, ' no existe en la BD');

    try{
      registerDto.password = await this.getHash(registerDto.password);
      return this.userRepository.save(registerDto);
    }catch(error){
      throw new InternalServerErrorException('Erro al registrar')
    }

  }

  async login(loginDto: LoginAuthDto){
    const usuario = await this.userRepository.findByEmail(loginDto.email);
    if (!usuario){
      throw new NotFoundException('Usuario no existe')
    }
    let isValidPassword;
    try{
      isValidPassword = await this.isMatch(loginDto.password, usuario.password)
    }catch(error){
      throw new InternalServerErrorException('error validar password')
    }

    if (isValidPassword){
      // return 'Login sucess'
      return {
        msg: 'Usuario validado',
        status: 200,
        user: usuario,
        token: this.getAccesToken(usuario)
      }
    }else{
      return 'Login not success'
    }
  }

  async getHash (password: string){
    return await bcrypt.hash(password,10);  
  }

  async isMatch (password: string, hash: string){
    return await bcrypt.compare(password, hash)
  }

  private getAccesToken(user: User){
    // console.log(user);
    // console.log(proccess.env.JWT_SECRET)

    try{
      // Crea el token con los campos del user seleccionado
      // y la configuración del jwtModule.register()
      const accessToken = this.jwtService.sign({
        id: user.id,
        name: user.username,
        email: user.email
        // rol: user.roles[0],
        // create: user.createdAt
      });
      return {
        token: accessToken
      }
    }catch(error){
      console.log(error);
      throw new InternalServerErrorException('Error al crear el token')
    }
  }
}
