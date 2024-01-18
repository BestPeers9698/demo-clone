
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('posts.id = :id', { id })
      .getOne();
  }
  
  
  async createPost(content: string, userId: number): Promise<Post> {
    const post = new Post();
    post.content = content;
  
    const user = new User();
    user.id = userId;
  
    post.user = user;
  
    return this.postRepository.save(post);
  }
  

  async updatePost(id: number, content: string): Promise<Post | undefined> {
    const post = await this.getPostById(id);
    if (!post) {
      return undefined;
    }

    post.content = content;

    return this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
