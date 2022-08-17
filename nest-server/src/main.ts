import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle("CV Builder")
		.setDescription("This is cv builder")
		.setVersion("1.0")
		.addTag("users")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	await app.listen(8080);
}
bootstrap();
