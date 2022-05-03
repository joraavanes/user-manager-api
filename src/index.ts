import { createServer } from 'http';
import { expressLoader, mongooseLoader } from "./app/loaders";
import { seedDb } from './app/utils/seed.db';

async function bootstrap() {
    await mongooseLoader();
    const app = expressLoader();

    await seedDb()

    const server = createServer(app);

    server.listen(3000, () => console.log('server is running'));
}

bootstrap();