

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserModule } from '../user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule,PostModule],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
