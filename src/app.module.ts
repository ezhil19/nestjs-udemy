import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { KnexModule } from 'nestjs-knex';
import { TaskKnexModule } from './task-knex/task-knex.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    KnexModule.forRoot(
      {
        config: {
          client: 'mysql2',
          useNullAsDefault: true,
          connection: {
            database: 'task_management',
            user: 'root',
            password: 'my-secret-pw',
            host: 'localhost',
            port: 3306,
            ssl: false,
          },
        },
      },
      'task_management',
    ),
    TasksModule,
    AuthModule,
    TaskKnexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
