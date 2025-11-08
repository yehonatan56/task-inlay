import { Entity, Fields, Validators } from 'remult';

export interface Item {
    text: string;
    responsible: string | undefined;
}
@Entity('list', { allowApiCrud: true })
export class List {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string({
        validate: [
            Validators.unique(),
            ({ name }) => {
                if (name.length < 3) throw new Error('Name must be at least 3 characters long');
            },
        ],
    })
    name = '';
    @Fields.string()
    description = '';
    @Fields.string({
        validate: [Validators.required()],
    })
    password = '';
    @Fields.json()
    items: Item[] = [];
}
