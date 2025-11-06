import { BackendMethod, repo } from 'remult';
import { List } from './list.js';

interface ListInfo {
    name: string;
    description: string;
}
export class AuthController {
    @BackendMethod({ allowed: true })
    static async hashPassword(password: string): Promise<string> {
        const bcrypt = await import('bcrypt');
        return await bcrypt.hash(password, 10);
    }

    @BackendMethod({ allowed: true })
    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return await bcrypt.compare(password, hashedPassword);
    }

    @BackendMethod({ allowed: true })
    static async createList(password: string, listInfo: ListInfo): Promise<List> {
        const newList = new List();
        newList.name = listInfo.name;
        newList.description = listInfo.description;
        if (password?.trim()) {
            /* You can't use `this` in a static backend methodץ Use AuthController.hashPassword instead */
            newList.password = await AuthController.hashPassword(password);
        }
        return await repo(List).insert(newList);
    }

    @BackendMethod({ allowed: true })
    static async loginToList(
        listName: string,
        password?: string,
        isAdmin: boolean = false
    ): Promise<{ success: boolean; list?: List; error?: string }> {
        try {
            const foundList = await repo(List).findOne({
                where: { name: listName },
            });

            if (!foundList) {
                return { success: false, error: 'לא נמצא חדר עם השם הזה' };
            }

            // בדיקת סיסמה רק אם זה מנהל ויש סיסמה לחדר
            if (isAdmin && foundList.password && foundList.password.trim()) {
                if (!password) {
                    return { success: false, error: 'נדרשת סיסמת מנהל לחדר זה' };
                }

                const isPasswordValid = await AuthController.verifyPassword(password, foundList.password);

                if (!isPasswordValid) {
                    return { success: false, error: 'סיסמה שגויה' };
                }
            }

            return { success: true, list: foundList };
        } catch (error) {
            console.error('שגיאה בהתחברות לחדר:', error);
            return { success: false, error: 'אירעה שגיאה בחיפוש החדר' };
        }
    }
}
