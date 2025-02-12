import { Module } from '@nestjs/common';
// import { TasksModule } from './tasks/tasks.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { KnexModule } from 'nestjs-knex';

@Module({
  // imports: [
  //   TasksModule,
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: 'localhost',
  //     port: 5432,
  //     username: 'postgres',
  //     password: 'postgres',
  //     database: 'task-management',
  //     autoLoadEntities: true,
  //     synchronize: true,
  //   }),
  //   AuthModule,
  // ],
  imports: [
    KnexModule.forRoot({
      config: {
        client: '',
        useNullAsDefault: true,
        connection: ':memory:',
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
