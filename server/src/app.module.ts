import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Document } from './users/models/Document';
import { User } from './users/models/User';
import { UserModule } from './users/users.module';
import { DataModule } from './ws/data.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {config} from "dotenv";

config({path:join(__dirname,"..",".env")});

// import * as CONN from "../conn";

// console.log(process.env);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.db_host,
      port: 3306,
      username:process.env.db_user,
      password: '',
      database: process.env.db_name,
      entities: [User,Document],
      synchronize: false,
      migrationsRun:false
  }),
  ServeStaticModule.forRoot({
    rootPath:join(__dirname,"client_build")
  }),
    UserModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}