import './componentsCSS.css'

export function SearchBar({onSearch}) {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const searchValue = event.target.value.toLowerCase();
            onSearch(searchValue);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Press enter to search or refresh the products..."
                onKeyDown={handleKeyPress}
                className="search-input"
            />
        </div>
    );
}
