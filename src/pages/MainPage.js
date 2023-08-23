import {useEffect, useState} from "react";
import {CategoryFilter} from "../components/FilterBar";
import {ProductCard} from "../components/ProductCard";
import {SearchBar} from "../components/SearchBar";
import "../components/componentsCSS.css";
import _debounce from 'lodash/debounce';
import {useAuth} from "../components/AuthComponent";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../redux/productsRedux";
import {setCart} from "../redux/cartRedux";
import {useGetAnotherProductsQuery} from "../redux/dummyApiRedux";
import CategoryBox from "../components/CategoryBox";
import axios from "axios";

const {useUpdateCartMutation} = require("../redux/apiRedux");


export function MainPage() {
    const {user} = useAuth();
    const [productsInPage, setProductsInPage] = useState(0);
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.post('http://localhost:8080/api/products/', { limit: 9, skip: 0 })
            .then(response => {
                setProducts(response.data);
                setProductsInPage(9);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleCategoryChange = async (category) => {
        let updatedSelectedCategories = [...selectedCategories];
        const index = updatedSelectedCategories.indexOf(category);
        if (index === -1) {
            updatedSelectedCategories.push(category);
        } else {
            updatedSelectedCategories.splice(index, 1);
        }
        setSelectedCategories(updatedSelectedCategories);
        handleFilterProducts(updatedSelectedCategories);
    };

    const handleFilterProducts = async (selectedCategories) => {
        try {
            let response;
            if (selectedCategories.length === 0) {
                response = await axios.post('http://localhost:8080/api/products/', {
                    limit: productsInPage,
                    skip: 0,
                });
            } else {
                response = await axios.post('http://localhost:8080/api/products/filter', {
                    categories: selectedCategories,
                    limit: productsInPage,
                    skip: 0,
                });
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    const handleFilterProductsScroll = async (selectedCategories) => {
        try {
            let response;
            if (selectedCategories.length === 0) {
                response = await axios.post('http://localhost:8080/api/products/', {
                    limit: 9,
                    skip: productsInPage,
                });
            } else {
                response = await axios.post('http://localhost:8080/api/products/filter', {
                    categories: selectedCategories,
                    limit: 9,
                    skip: productsInPage,
                });
            }
            setProducts(existingProducts => [...existingProducts, ...response.data]);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    const handleScroll = _debounce(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if(productsInPage+9<=products.length) {
                console.log(productsInPage, products.length);
                setProductsInPage(productsInPage + 9);
            }
            handleFilterProductsScroll(selectedCategories);}}
        , 300);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleAddToCart = async (product, quantity = 1) => {
        try {
            const response = await updateCart({
                user: user,
                product: { productId: Number(product.id), quantity: quantity },
            });
            if (response.data) {
                dispatch(setCart(response.data.products));
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    return (
        <div className="main-page">
            <CategoryBox categories={categories} selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange} />
            <ProductCard products={products} handleAddToCart={handleAddToCart} />
        </div>
    );
}

