import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MongooseModule.forRoot(`${process.env.MONGO_URL}/CVBuilder`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
