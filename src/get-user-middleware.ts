import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './module/users/users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'];
    console.log('Headers:', req.headers);
    const userdd = 1;
    console.log('userId', userId);

    if (userId) {
      return res.status(401).json({ message: 'user_id is required' });
    }

    const user = await this.usersService.findByUserId(Number(userdd));

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    next();
  }
}
