import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../untils/constants"
import axios from "axios"

const initialState = {
    list: [],
    isLoading: false,
    error: null,
}
export const getCategories = createAsyncThunk(
    'categories/getCategories', 
    async (_, thunkAPI) => {
        try {
            const response = await axios(`${BASE_URL}/categories`)
            return response.data
        } catch (error) {
            console.error("Error fetching categories:", error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    })

const categoriesSlice = createSlice({
        name: 'categories',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state,{payload}) => {
                state.list = payload;
                state.isLoading = false;
                state.error = null
            })
            .addCase(getCategories.rejected, (state, {payload} ) => {
                state.isLoading = false;
                state.error = payload || 'Something went wrong'
            })
        }
    })

    export default categoriesSlice.reducer