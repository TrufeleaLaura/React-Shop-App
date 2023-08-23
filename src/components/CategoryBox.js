import React from 'react';
import './componentsCSS.css';

const CategoryBox = ({ categories, selectedCategories, onChangeCategory }) => {
    return (
        <div className="category-box">
            {categories.map((category, index) => (
                <div className="checkbox-container" key={index}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => onChangeCategory(category)}
                        />
                        {category}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CategoryBox;