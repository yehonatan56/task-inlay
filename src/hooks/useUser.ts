import React, { useEffect, useState } from 'react';
import { List } from '../shared/list.js';
import { AuthController } from '../shared/AuthController.js';
import { repo } from 'remult';
import { useParams } from 'react-router-dom';

export default function useUser() {
    const [name, setName] = useState<string>('');
    const [listName, setListName] = useState<string>('');
    const [list, setList] = useState<Omit<List, 'password'> | null>(null);

    const { id } = useParams();

    useEffect(() => {
        console.log('asking for name');
        if (id) {
            console.log('Trying to connect to list', id);
            setName(prompt('Enter your name') || '');
            setListName(id);
            handleConnect(new Event('submit') as unknown as React.FormEvent, id);
        }
    }, []);
    const handleConnect = (e: React.FormEvent, id?: string) => {
        e?.preventDefault();
        AuthController.loginToList(listName || id, '', false)
            .then((loggedInList) => {
                if (loggedInList.list) {
                    setList({
                        id: loggedInList.list.id,
                        name: loggedInList.list.name,
                        description: loggedInList.list.description,
                        items: loggedInList.list.items.filter((item) => !item.responsible),
                    });
                } else {
                    alert('Connect failed: ' + loggedInList?.error);
                }
            })
            .catch((error) => {
                console.error('Connect failed:', error);
            });
    };

    const handleClickItem = async (itemText: string) => {
        if (!list) return;
        list.items = list.items.map((item) =>
            item.text === itemText ? { ...item, responsible: !item.responsible ? name : item.responsible } : item
        );
        await repo(List).save(list);
        setList({ ...list });
    };

    return {
        name,
        setName,
        list,
        listName,
        setListName,
        handleConnect,
        handleClickItem,
    };
}
