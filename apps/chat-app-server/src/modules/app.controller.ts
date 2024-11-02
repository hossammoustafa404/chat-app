import { Public } from '@/shared/decorators';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Welcome')
@Controller()
export class AppController {
  @Public()
  @Get()
  welcome(@Res() res: Response) {
    return res.send(
      `
     <div style="text-align:center; margin-top:1.5rem;">
        <h1>Welcome to Chat App API.</h1>
        <p>Go to v1 documentation through this link: <a href="${process.env.BASE_URL}/api/v1/docs">Documentation</a></p>
      </div>
      `
    );
  }
}
