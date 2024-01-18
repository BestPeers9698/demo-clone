// src/posts/post.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from '../post/entity/post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: number): Promise<PostEntity | undefined> {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() body: { content: string; userId: number }): Promise<PostEntity> {
    return this.postService.createPost(body.content, body.userId);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') id: number,
    @Body() body: { content: string },
  ): Promise<PostEntity | undefined> {
    return this.postService.updatePost(id, body.content);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }
}
