import "./componentsCSS.css"

export function CategoryFilter({categories, onClickCategory}) {
    return (
        <div className="category-filter">
            {categories?.map((category, index) => (
                <p onClick={() => onClickCategory(category)} key={index}>{category}</p>
            ))}
        </div>
    )
}