import './componentsCSS.css'

export function SearchBar({onChangeSearch}) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products in page..."
                onChange={onChangeSearch}
                className="search-input"
            />
        </div>
    );
}