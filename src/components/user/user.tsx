import useUser from '../../hooks/useUser';
import './user.css';

export default function User() {
    const { name, setName, list, listName, setListName, handleConnect, handleClickItem } = useUser();
    console.log('user render',list);

    return (
        <div className="user-container">
            {!list ? (
                <div className="connect-form-container">
                    <form onSubmit={handleConnect} className="connect-form">
                        <h2>Connect to List</h2>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="name-input"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter list name or id"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            className="name-input"
                            required
                        />
                        <button type="submit" className="connect-button">
                            Connect
                        </button>
                    </form>
                </div>
            ) : (
                <div className="list-container">
                    <h2>Welcome, {name}!</h2>
                    <h3>{list.name}</h3>
                    <p>{list.description}</p>
                    <div className="items-container">
                        {list.items
                            .map((item, idx) => (
                                <div key={idx} className="item" onClick={() => handleClickItem(item.text)}>
                                    <span className="item-text">{item.text}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
