import { Controller, Get,Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import {join} from "path";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  home(@Res() res:Response){
    res.sendFile(join(__dirname,"client_build","index.html"));
  }
}

