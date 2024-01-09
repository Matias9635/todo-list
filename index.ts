import { AppDataSource } from "./infrastructure/orm/typeorm";
import { createServer } from "./infrastructure/webserver/server";

async function bootstrap() {
    await AppDataSource.initialize();
    const server = await createServer();

    const port = 8000;
    server.listen(port, () => {
        console.log(`NOW LISTENING ON PORT ${port}`);
    });
}

bootstrap();