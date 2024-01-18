import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(username: string): Promise<User> {
    const user = new User();
    user.username = username;
    return this.userRepository.save(user);
  }

  async updateUser(id: number, username: string): Promise<User | undefined> {
    const user = await this.getUserById(id);
    if (!user) {
      return undefined;
    }

    user.username = username;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
