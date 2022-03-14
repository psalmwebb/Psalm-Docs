import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Document } from './users/models/Document';
import { User } from './users/models/User';
import { UserModule } from './users/users.module';
import { DataModule } from './ws/data.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

// import * as CONN from "../conn";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'psalmdocs',
      entities: [User,Document],
      synchronize: false,
      migrationsRun:false
  }),
  ServeStaticModule.forRoot({
    rootPath:join(__dirname,"..","client_build")
  }),
    UserModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}