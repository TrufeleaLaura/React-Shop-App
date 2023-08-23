import React from 'react';
import './componentsCSS.css';

const CategoryBox = ({ categories, selectedCategories, onChangeCategory }) => {
    return (
        <div className="category-box">
            <h3>Categories</h3>
            {categories.map(category => (
                <label key={category}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => onChangeCategory(category)}
                    />
                    {category}
                </label>
            ))}
        </div>
    );
};

export default CategoryBox;