import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import './admin.css';

const Admin: React.FC = () => {
    const {
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
    } = useAdmin();

    const [newItemText, setNewItemText] = useState('');

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>

            <form onSubmit={handleCreateList} className="admin-form">
                <h2>Create List</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="List Name"
                        value={listNameToCreate}
                        onChange={(e) => setListNameToCreate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        value={lisstDescriptionToCreate}
                        onChange={(e) => setListDescriptionToCreate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={listPasswordToCreate}
                        onChange={(e) => setListPasswordToCreate(e.target.value)}
                    />
                </div>
                <button type="submit">Create List</button>
            </form>

            <form onSubmit={handleLoginToList} className="admin-form">
                <h2>Login to List</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="List Name"
                        value={listNameToLogin}
                        onChange={(e) => setListNameToLogin(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={listPasswordToLogin}
                        onChange={(e) => setListPasswordToLogin(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {list && (
                <div className="current-list">
                    <h2>Current List</h2>
                    <div className="list-info">
                        <div>Name: {list.name}</div>
                        <div>Description: {list.description}</div>
                        <div>Link to Share: {import.meta.env.VITE_APP_URL + '/user/' + list.id}</div>
                    </div>
                    <ul className="items-list">
                        {list.items?.map((item, idx) => (
                            <li key={idx}>
                                {item.text} - Responsible: {item.responsible || 'Unassigned'}
                            </li>
                        ))}
                    </ul>
                    <form
                        className="add-item-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (newItemText.trim()) {
                                addItemToList(newItemText);
                                setNewItemText('');
                            }
                        }}
                    >
                        <input
                            type="text"
                            placeholder="New item"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                        />
                        <button type="submit">Add Item</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Admin;
