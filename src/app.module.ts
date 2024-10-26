import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserMiddleware } from './get-user-middleware';
import { ProposalModule } from './module/proposals/proposals.module';
import { UsersModule } from './module/users/users.module';
import { CustomersModule } from './module/customers/customers.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProposalModule, UsersModule, CustomersModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
