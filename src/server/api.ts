import { remultApi } from 'remult/remult-express';
import { List } from '../shared/list.ts';
import { AuthController } from '../shared/AuthController.ts';
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
