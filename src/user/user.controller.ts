import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: { username: string }): Promise<User> {
    
    return this.userService.createUser(body.username);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() body: { username: string },
  ): Promise<User> {
    return this.userService.updateUser(id, body.username);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
