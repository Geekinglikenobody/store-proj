import React, {useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';

import { ROUTES } from '../../untils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate()
    const {list, related} = useSelector(({productsSlice}) => productsSlice)

    const { data, isFetching, isLoading, isSuccess } = useGetProductQuery({ id });

    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }        
    }, [isLoading, isFetching, isSuccess,navigate])

    useEffect(() => {
        if(!data || !list.length) return;
            dispatch(getRelatedProducts(data.category.id))
    }, [data, dispatch, list.length])

    return data ? (
        <>
            <Product {...data}/>
            <Products title={"Related products"} products={related} amount={10}/>
        </>
    ) : (
        <section className="preloader">Loading...</section>
    )   
};

export default SingleProduct;