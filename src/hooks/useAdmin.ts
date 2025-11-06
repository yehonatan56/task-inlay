import { useEffect, useState } from 'react';
import { AuthController } from '../shared/AuthController.ts';
import { List } from '../shared/list.ts';
import { repo } from 'remult';

export function useAdmin() {
    const [listNameToCreate, setListNameToCreate] = useState<string>('');
    const [lisstDescriptionToCreate, setListDescriptionToCreate] = useState<string>('');
    const [listPasswordToCreate, setListPasswordToCreate] = useState<string>('');
    const [listNameToLogin, setListNameToLogin] = useState<string>('');
    const [listPasswordToLogin, setListPasswordToLogin] = useState<string>('');
    const [list, setList] = useState<List | null>(null);

    useEffect(() => {
        if (!list?.id) return;
        repo(List)
            .liveQuery({
                where: {
                    id: list?.id,
                },
            })

            .subscribe((updatedLists) => {
                const changes = updatedLists.items;
                if (changes.length > 0) {
                    const list = changes[0];
                    setList(list);
                }
            });
    }, [list?.id]);

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        AuthController.createList(listPasswordToCreate, {
            name: listNameToCreate,
            description: lisstDescriptionToCreate,
        })
            .then((createdList) => {
                setList(createdList);
            })
            .catch((error) => {
                alert('Error creating list: ' + error.message);
                console.error('Error creating list:', error);
            });
    };

    const handleLoginToList = (e: React.FormEvent) => {
        e.preventDefault();
        AuthController.loginToList(listNameToLogin, listPasswordToLogin, true) // i
            .then((loggedInList) => {
                if (loggedInList.success) {
                    setList(loggedInList.list!);
                } else {
                    alert('Login failed: ' + loggedInList?.error);
                }
            })
            .catch((error) => {
                alert('Error logging in to list: ' + error.message);
                console.error('Error logging in to list:', error);
            });
    };

    const addItemToList = (text: string) => {
        if (!list) return;
        const updatedList = {
            ...list,
            items: [...list.items, { text, responsible: undefined }],
        };
        repo(List)
            .save(updatedList)
            .then(() => {
                setList({ ...updatedList });
            })
            .catch((error) => {
                alert('Error adding item to list: ' + error.message);
                console.error('Error adding item to list:', error);
            });
    };

    return {
        list,
        listNameToCreate,
        setListNameToCreate,
        lisstDescriptionToCreate,
        setListDescriptionToCreate,
        listPasswordToCreate,
        setListPasswordToCreate,
        listNameToLogin,
        setListNameToLogin,
        listPasswordToLogin,
        setListPasswordToLogin,
        handleCreateList,
        handleLoginToList,
        addItemToList,
    };
}
