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
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const {data: dataProducts, error} = useGetAnotherProductsQuery({productsInPage: productsInPage});
    const [flag, setFlag] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect( () => {
        console.log(productsInPage);
         axios.get('http://localhost:8080/api/products/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    useEffect(() => {
        if (flag === false) {
            if (dataProducts) {
                dispatch(setProducts(dataProducts));
                setProductsInPage(productsInPage + 9);
                setFlag(true);
            }
        }
    }, [dataProducts]);


    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

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

    useEffect(() => {
        handleFilterProducts(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        console.log("aici");
        console.log(filteredProducts);
        setFilteredProducts(filteredProducts);
    },[filteredProducts,productsInPage]);

    const handleFilterProducts = async (selectedCategories) => {
        try {
            let response;
            console.log(productsInPage+"filter");
            if (selectedCategories.length === 0) {
                response = await axios.post('http://localhost:8080/api/products/',
                    {limit: productsInPage,skip:0});
            } else {
                response = await axios.post(`http://localhost:8080/api/products/filter`,
                    {categories: selectedCategories,skip:0,limit:productsInPage});
            }
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };
    const handleFilterProductsScroll = async (selectedCategories) => {
        try {
            let response;
            console.log(productsInPage+"filterScroll")
            if (selectedCategories.length === 0) {
                response = await axios.post('http://localhost:8080/api/products/',
                    {limit: 9,skip:productsInPage});
            } else {
                response = await axios.post(`http://localhost:8080/api/products/filter`,
                    {categories: selectedCategories,skip:productsInPage,limit:9});
            }
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };



    const handleScroll = _debounce(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight ) {
            if (dataProducts && categories.length === 0) {
                console.log(productsInPage+"scrollAll")
                setProductsInPage(productsInPage + 9);
                dispatch(setProducts(dataProducts));
            }
            else{
                setProductsInPage(productsInPage + 9);
                handleFilterProductsScroll(selectedCategories);
            }
        }
    }, 300);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


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


    return (
        <div className="main-page">
            <div className="category-box">
                {categories.map((category, index) => (
                    <div className="checkbox-container" key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
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