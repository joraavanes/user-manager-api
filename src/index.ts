require("dotenv").config();
import { createServer } from 'http';

import { expressLoader, mongooseLoader } from "./app/loaders";
import { seedDb } from './app/utils/seed.db';

async function bootstrap() {
    await mongooseLoader();
    const app = expressLoader();

    await seedDb()

    const server = createServer(app);

    server.listen(process.env.PORT, () => console.log('server is running'));
}

bootstrap();