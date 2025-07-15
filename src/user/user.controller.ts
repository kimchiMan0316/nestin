import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDTO } from './DTO/get-user-dto';
import { CreateUserDto } from './DTO/create-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LoginResponse } from 'src/auth/auth.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async read(@Param('id') id: string): Promise<GetUserDTO | null> {
    const findUser = await this.userService.get(id);
    if (!findUser) {
      throw new NotFoundException('없는 유저입니당.');
    }
    return findUser;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }

  @Post('/profilePhoto')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createProfilePhoto(
    @Request() req: { user: LoginResponse },
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(req.user);
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }
    const ID = req.user.id; // JWT에서 user ID 추출/

    const photoUrl = `http://localhost:3000/uploads/${file.filename}`;

    // DB에 해당 user의 profilePhoto 업데이트
    const result = await this.userService.updateProfilePhoto(ID, photoUrl);

    return {
      message: '사진 업로드 성공',
      profilePhoto: photoUrl,
      result,
    };
  }

  @Delete()
  delete(@Param() id: string) {
    return this.userService.delete(id);
  }

  @Get()
  async findAll(): Promise<GetUserDTO[]> {
    const users = await this.userService.getAll();
    return users;
  }
}
