// like.controller.ts
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from './entity/like.entity';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  async getAllLikes(): Promise<Like[]> {
    return this.likeService.getAllLikes();
  }

  @Get('post/:postId')
  async getLikesForPost(@Param('postId') postId: number): Promise<Like[]> {
    return this.likeService.getLikesForPost(postId);
  }

  @Post()
  async createLike(@Body('userId') userId: number, @Body('postId') postId: number): Promise<Like> {
    return this.likeService.createLike(userId, postId);
  }

  @Get(':userId/:postId/count')
  async getLikeCountForUserAndPost(@Param('userId') userId: number, @Param('postId') postId: number): Promise<{ statusCode: number; likeCount: number }> {
    return this.likeService.getLikeCountForUserAndPost(userId, postId);
  }
  
  @Delete(':id')
  async deleteLike(@Param('id') id: number): Promise<void> {
    return this.likeService.deleteLike(id);
 
  }
}
