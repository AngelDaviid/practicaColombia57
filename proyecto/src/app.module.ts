import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://angelvalencia:123lolvalencia21@cluster0.y9kvnp5.mongodb.net/task?retryWrites=true&w=majority'),TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
