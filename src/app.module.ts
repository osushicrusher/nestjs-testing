import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskModule } from './tasks/task.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // 開発用コンテナのポートを指定
      username: 'root',
      password: 'secret',
      database: 'mydb-dev', // 開発用のデータベース名を指定
      autoLoadEntities: true, // true とすると、Entity が自動的に読み込まれます
      synchronize: true, // true とすると、アプリケーションを起動時に自動でテーブルが作成されます
    }),
    TaskModule,
  ],
})
export class AppModule {}
