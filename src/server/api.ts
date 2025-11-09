import { remultApi } from 'remult/remult-express';
import { List } from '../shared/list.js';
import { AuthController } from '../shared/AuthController.js';
import { createPostgresDataProvider } from 'remult/postgres';

export const api = remultApi({
    dataProvider:
        process.env['NODE_ENV'] === 'production'
            ? createPostgresDataProvider({
                  connectionString: process.env.DATABASE_URL,
              })
            : undefined,
    entities: [List],
    controllers: [AuthController],
});
