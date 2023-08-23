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

const {useUpdateCartMutation} = require("../redux/apiRedux");


export function MainPage() {
    const {user} = useAuth();
    const [productsInPage, setProductsInPage] = useState(0);
    const products = useSelector(state => state.products);
    const [categories, setCategories] = useState(["All Products"]);
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const {data: dataProducts, error} = useGetAnotherProductsQuery({productsInPage: productsInPage});
    const [flag, setFlag] = useState(false);




    useEffect(() => {
        console.log(flag);
        if (flag === false) {
            if (dataProducts) {
                console.log(dataProducts);
                dispatch(setProducts(dataProducts));
                setProductsInPage(productsInPage + 9);
                setFlag(true);
            }
        }
    }, [dataProducts]);


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

    const handleScroll = _debounce(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && selectedCategory === "All Products") {
            if (dataProducts) {
                setProductsInPage(productsInPage + 9);
                dispatch(setProducts(dataProducts));
            }
        }
    }, 300);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, productsInPage, selectedCategory]);


    const handleSearch = (searchValue) => {
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
            const response = await updateCart({
                user: user,  product: { productId: Number(product.id), quantity: quantity }
            });
            if (response.data) {
                dispatch(setCart(response.data.products));
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
        <div className="main-page">
            <div className="category-box">
                {categories.map((category, index) => (
                    <div className="checkbox-container">
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={selectedCategory.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                    </label>
                    </div>
                ))}
            </div>

                {/*<SearchBar onChangeSearch={(value) => handleSearch(value)} />*/}
                <ProductCard products={filteredProducts} handleAddToCart={handleAddToCart} />

        </div>
    );
}