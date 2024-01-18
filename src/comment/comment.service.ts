import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['user', 'post'] });
  }

  async getCommentById(id: number): Promise<Comment | undefined> {
    return this.commentRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.post', 'post')
      .where('comments.id = :id', { id })
      .getOne();
  }

  async createComment(
    content: string,
    userId: number,
    postId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = content;

    const post = new Post();
    post.id = postId;

    const user = new User();
    user.id = userId;

    comment.post = post;
    comment.user = user;

    return this.commentRepository.save(comment);
  }

  async updateComment(
    id: number,
    content: string,
  ): Promise<Comment | undefined> {
    const comment = await this.getCommentById(id);
    if (!comment) {
      return undefined;
    }

    comment.content = content;

    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
