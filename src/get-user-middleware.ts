import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './module/users/users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const tokenParts = authHeader.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid authorization format');
      }

      const userId = Number(tokenParts[1]);
      console.log(userId);

      if (isNaN(userId)) {
        throw new UnauthorizedException('User ID must be a valid number');
      }

      const user = await this.usersService.findOne(userId);

      if (user && user.id === userId) {
        (req as any).user = user;
        next();
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
