import { useEffect, useState } from "react";
import { CategoryFilter } from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import {getProducts, useFetchProductsInitial} from "../components/hooksApi";
import {SearchBar} from "../components/SearchBar";
import "../components/componentsCSS.css";
import _debounce from 'lodash/debounce';
import {useAuth} from "../components/AuthComponent";
import {useDispatch, useSelector} from "react-redux";
import { setProducts} from "../redux/productsRedux";
import {fetchInitialProducts} from "../redux/productThunk";
import { setCart} from "../redux/cartRedux";
const {useUpdateCartMutation} = require("../redux/apiRedux");

export function MainPage() {
    const ID_CART = "64c77ddd8e88f";
    const {user} = useAuth();
    const [productsInPage, setProductsInPage] = useState(9);
    const products= useSelector(state => state.products);
    const [categories, setCategories] = useState(["All Products"]);
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        dispatch(fetchInitialProducts());
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products);
            const updatedCategories = [
                "All Products",
                ...new Set(products.map((product) => product.category)),
            ];
            setCategories(updatedCategories);
        }
    }, [products]);

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
                        dispatch(setProducts(data));
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



    const handleSearch= (searchValue) => {
        const searchTerm = searchValue.target.value.toLowerCase();
        if (searchTerm === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)));
        }
    };
    const handleAddToCart = async (product, quantity = 1) => {
        try {
            const response = await updateCart({token:user,product:[{id:Number(product.id),quantity:quantity}]});
            if(response.data){
                dispatch(setCart(response.data.data.products));
            }

        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    useEffect(() => {
        const categories = ["All Products", ...new Set(products.map((product) => product.category))];
        setCategories(categories);
    }, [products]);

    return (
        <>
            <CategoryFilter  categories ={categories} onClickCategory={handleCategoryChange} />
            <SearchBar onChangeSearch={(value)=>handleSearch(value)} />
            <ProductCard products={filteredProducts} handleAddToCart={handleAddToCart} />
        </>
    );
}