import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState ([]);
    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then( data => setProducts(data))
    }, [])

    /* useEffect(()=>{
        const storedCart = getShoppingCart();
        // Step-01: get id
        for(const id in storedCart){
            // step -2: get product by id
            const addedProduct = products.find(product => product.id === id)

            // Step-03: get the quantity of product
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            console.log(addedProduct)
        }
    },[products]) */

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step-01: get id
        for(const id in storedCart){
            // Step-02: get products from products state using id
            const addedProducts = products.find(product => product.id === id)
            if(addedProducts){
                // Step-03: Add quantity
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;

                //Step-4:Add the added product to the saved cart
                savedCart.push(addedProducts);
            }

        }
        // Step-05: Set the cart
        setCart(savedCart);
    },[products])

    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                         product = {product} 
                         key={product.id}
                         handleAddToCart = {handleAddToCart}
                         ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart ={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;