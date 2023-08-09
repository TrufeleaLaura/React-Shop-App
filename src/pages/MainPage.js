import { useEffect, useState } from "react";
import { CategoryFilter } from "../components/FilterSearch";
import { ProductCard } from "../components/ProductCard";
import {getProducts, useFetchProductsInitial} from "../components/hooksApi";
import {SearchBar} from "../components/SearchBar";
import "../components/componentsCSS.css";
import _debounce from 'lodash/debounce';
import {useAuth, useLocalStorage} from "../components/AuthComponent";

export function MainPage() {
    const ID_CART = "64c77ddd8e88f";
    const {user} = useAuth();
    const [productsInPage, setProductsInPage] = useState(9);
    const [products, setProducts] = useFetchProductsInitial();
    const [categories, setCategories] = useState(["All Products", ...new Set(products.map((product) => product.category))]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [cartStorageValue, setCartStorageValue] = useLocalStorage('cartLocalStorage', []);

    useEffect(() => {
        if(products.length > 0){
            setFilteredProducts(products);
        }
    },[products]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        if (category === "All Products") {
            setFilteredProducts(products);
        } else {
            const updatedFilteredProducts = products.filter(product => product.category === category);
            setFilteredProducts(updatedFilteredProducts);
        }
    };

    useEffect( () => {
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
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)));
        }
    };
    const handleAddToCart = async (product,quantity=1) => {
        try {
            const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   'Internship-Auth': `${user}`,
                },
                body: JSON.stringify({
                    products: [
                        {
                            id: product.id,
                            quantity: quantity,
                        }
                    ]
                })
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const existingCart = [...cartStorageValue];
            const productInCart = existingCart.find((item) => item.id === Number(product.id));

            if (productInCart) {
                productInCart.quantity+=quantity;
            } else {
                existingCart.push({ ...product, quantity: 1 });
            }
            setCartStorageValue(existingCart);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };



    return (
        <>
            <CategoryFilter categories={categories} onClickCategory={handleCategoryChange} />
            <SearchBar onChangeSearch={(value)=>handleSearch(value)} />
            <ProductCard products={filteredProducts} handleAddToCart={handleAddToCart} />
        </>
    );
}
