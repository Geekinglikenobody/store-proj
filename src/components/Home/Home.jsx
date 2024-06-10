import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterByPrice } from '../../features/products/productsSlice';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import { useEffect } from 'react';


const Home = () => {
    const dispatch = useDispatch()
    const {productsSlice,categoriesSlice} = useSelector((state) => state )

    useEffect(() => {
        if(!productsSlice.list.length) return 
        dispatch(filterByPrice(30))        
    }, [dispatch, productsSlice.list.length]);

    return (
        <>
            <Poster/>
            <Products title={"Trending"} products={productsSlice.list} amount={5}/>
            <Categories title={"Worth seeing"} products={categoriesSlice.list} amount={5}/>
            <Banner/>
            <Products title={"Less than 100$"} products={productsSlice.filtered} amount={5}/>
        </>
    );
};

export default Home;    