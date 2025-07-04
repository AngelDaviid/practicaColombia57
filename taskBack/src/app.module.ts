import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { validationSchema } from './Config/validation';

@Module({
  imports: [
      ConfigModule.forRoot({  //Load the environment variables and makes them available to the app
        isGlobal: true,
        expandVariables: true,
          validationSchema, //Validation of exist the environment variables
      })
      ,
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              uri: configService.get<string>('URL_DATABASES', { infer: true }) //Get the value of the environment variable
          }),
      }),
      TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
