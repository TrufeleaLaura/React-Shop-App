import { useEffect, useState } from "react";
import { CategoryFilter } from "../components/FilterSearch";
import { ProductCard } from "../components/ProductCard";
import {getProducts, useCartProducts, useFetchProductsInitial} from "../components/hooksApi";
import {SearchBar} from "../components/SearchBar";
import "../components/componentsCSS.css";
import _debounce from 'lodash/debounce';

export function MainPage() {
    const [productsInPage, setProductsInPage] = useState(9);
    const [products, setProducts] = useFetchProductsInitial();
    const [categories, setCategories] = useState(["All Products", ...new Set(products.map((product) => product.category))]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const filteredProducts = selectedCategory === "All Products"
        ? products
        : products.filter(product => product.category === selectedCategory);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const handleScroll = _debounce(() => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight && selectedCategory === "All Products") {
                console.log(selectedCategory);
                const productsAlreadyInPage = productsInPage;
                const newProductsInPage = productsAlreadyInPage + 9;

                getProducts(`https://dummyjson.com/products?limit=9&skip=${productsAlreadyInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images,discountedPrice`)
                    .then(data => {
                        setProducts(prevProducts => [...prevProducts, ...data]);
                        setProductsInPage(newProductsInPage);
                    })
                    .catch(error => {
                        console.error('Error fetching additional products:', error);
                    });
            }
        }, 300);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [productsInPage,selectedCategory]);

    useEffect(() => {
        const categories = ["All Products", ...new Set(products.map((product) => product.category))];
        setCategories(categories);
    }, [products]);


    const handleSearch= (searchValue) => {
        const searchTerm = searchValue.target.value.toLowerCase();
        if (searchTerm === "") {
            setProducts(products);
        } else {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <>
            <CategoryFilter categories={categories} onClickCategory={handleCategoryChange} />
            <SearchBar onChangeSearch={(value)=>handleSearch(value)} />
            <ProductCard products={filteredProducts} />
        </>
    );
}
