import { remultApi } from 'remult/remult-express';
import { List } from '../shared/list.ts';

export const api = remultApi({
    entities: [List],
});
