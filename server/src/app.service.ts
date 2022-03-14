import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello the world';
  }

  getHi(): string {
    return 'Hi everyone';
  }
}
