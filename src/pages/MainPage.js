import {useEffect, useState} from "react";
import {CategoryFilter} from "../components/CategoryFilter";
import {ProductCard} from "../components/ProductCard";
import "../components/componentsCSS.css";

export function MainPage(){
    const[productsInPage, setProductsInPage] = useState(0);
    const [categories, setCategories] = useState(["All Products"]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    const handleVerifyExistingCategory = (category) => {
        const existingCategory = categories.find((category) => category === selectedCategory);
        if(!existingCategory){
            setCategories([...categories, selectedCategory]);
        }
    }

    useEffect(() => {
        window.onscroll = function (ev) {
            //console.log(scrollJustAllProducts);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
                setProductsInPage((prevProductsInPage) => prevProductsInPage + 9);
                handleVerifyExistingCategory(selectedCategory);
            }
        };
    }, []);

    return (
        <>
        <CategoryFilter categories={categories} onClickCategory={handleCategoryChange}/>
        <ProductCard totalProductsInPage={productsInPage} selectedCategory={selectedCategory}/>
        </>
    )
}