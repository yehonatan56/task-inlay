import { remultApi } from 'remult/remult-express';
import { List } from '../shared/list.ts';
import { AuthController } from '../shared/AuthController.ts';

export const api = remultApi({
    entities: [List],
    controllers: [AuthController],
});
