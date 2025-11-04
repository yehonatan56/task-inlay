import { Entity, Fields } from 'remult';

export interface Item {
    text: string;
    responsible: string | undefined;
}
@Entity('list', { allowApiCrud: true })
export class List {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string()
    name = '';
    @Fields.string()
    password = '';
    @Fields.json()
    items: Item[] = [];
}
