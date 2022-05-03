import { createServer } from 'http';
import { expressLoader, mongooseLoader } from "./app/loaders";

async function bootstrap() {
    await mongooseLoader();
    const app = expressLoader();

    const server = createServer(app);

    server.listen(3000, () => console.log('server is running'));
}

bootstrap();