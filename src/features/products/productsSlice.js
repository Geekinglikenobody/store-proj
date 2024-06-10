import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../untils/constants"
import axios from "axios"
import { shuffle } from "../../untils/common"

const initialState = {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
    error: null,
}

export const getProducts = createAsyncThunk(
    'products/getProducts', 
    async (_, thunkAPI) => {
        try {
            const response = await axios(`${BASE_URL}/products`)
            return response.data
        } catch (error) {
            console.error("Error fetching categories:", error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    })

const productsSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {
            filterByPrice: (state, {payload}) => {
                state.filtered = state.list.filter(({price}) => price < payload )
            },
            getRelatedProducts: (state, {payload}) => {
                const list = state.list.filter(({category : {id}}) => id === payload)
                state.related = shuffle(list)
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state,{payload}) => {
                state.list = payload;
                state.isLoading = false;
                state.error = null
            })
            .addCase(getProducts.rejected, (state, {payload} ) => {
                state.isLoading = false;
                state.error = payload || 'Something went wrong'
            })
        }
    })
    
    export const {filterByPrice, getRelatedProducts} = productsSlice.actions

    export default productsSlice.reducer