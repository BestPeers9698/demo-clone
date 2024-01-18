import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entity/like.entity';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async getAllLikes(): Promise<Like[]> {
    return this.likeRepository.find({ relations: ['user', 'post'] });
  }

  async getLikesForPost(postId: number): Promise<Like[]> {
    return this.likeRepository.find({ where: { post: { id: postId } }, relations: ['user', 'post'] });
  }

  async createLike(userId: number, postId: number): Promise<Like> {
    const like = new Like();
    like.user = { id: userId } as User;
    like.post = { id: postId } as Post;

    return this.likeRepository.save(like);
  }

  async deleteLike(id: number): Promise<void> {
    await this.likeRepository.delete(id);
  }
  
  async getLikeCountForUserAndPost(userId: number, postId: number): Promise<{ statusCode: number; likeCount: number }> {
    const likeCount = await this.likeRepository.count({ where: { user: { id: userId }, post: { id: postId } } });
    return { statusCode: 200, likeCount: likeCount };
  }
  
}
