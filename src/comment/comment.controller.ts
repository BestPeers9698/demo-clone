import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number): Promise<Comment | undefined> {
    return this.commentService.getCommentById(id);
  }

  @Post()
  async createComment(
    @Body('content') content: string,
    @Body('userId') userId: number,
    @Body('postId') postId: number,
  ): Promise<Comment> {
    return this.commentService.createComment(content, userId, postId);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<Comment | undefined> {
    return this.commentService.updateComment(id, content);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return this.commentService.deleteComment(id);
  }
}
