import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../untils/constants"
import axios from "axios"

const initialState = {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
    
    error: null,
}

export const createUser = createAsyncThunk(
    'users/createUser', 
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, payload)
            return response.data
        } catch (error) {
            console.error("Error fetching categories:", error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    })

    export const loginUser = createAsyncThunk(
        'users/loginUser', 
        async (payload, thunkAPI) => {
            try {
                const response = await axios.post(`${BASE_URL}/auth/login`, payload)
                const login = await axios(`${BASE_URL}/auth/profile`, {
                    headers: {
                        "Authorization" : `Bearer ${response.data.access_token}`
                    }
                })
                return login.data
            } catch (error) {
                console.error("Error fetching categories:", error);
                return thunkAPI.rejectWithValue(error.response?.data || error.message)
            }
        })

        export const updateUser = createAsyncThunk(
            'users/updateUser', 
            async (payload, thunkAPI) => {
                try {
                    const response = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
                    return response.data
                } catch (error) {
                    console.error("Error fetching categories:", error);
                    return thunkAPI.rejectWithValue(error.response?.data || error.message)
                }
            })

const addCurrentUser = (state,{payload}) => {
    state.currentUser = payload
    state.isLoading = false;
}
const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            addItemToCart : (state, {payload}) => {
                let newCart = [...state.cart]
                const found = state.cart.find(({id}) => id ===payload.id)

                if(found) {
                    newCart = newCart.map((item) => {
                        return item.id === payload.id ? {...item, quantity : payload.quantity || item.quantity + 1} : item
                    })
                }else {
                    newCart.push({...payload, quantity : 1})
                }

                state.cart = newCart
            },
            removeItemFromCart: (state, {payload}) => {
                state.cart = state.cart.filter(({id}) => id !== payload)
            },
            toggleForm: (state, {payload}) => {
                state.showForm = payload
            },
            toggleFormType: (state, {payload}) => {
                state.formType = payload
            }
        },
        extraReducers: (builder) => {
            builder
            //create
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, addCurrentUser)
            .addCase(createUser.rejected, (state, {payload} ) => {
                state.isLoading = false;
                state.error = payload || 'Something went wrong'
            })
            //login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, addCurrentUser)
            .addCase(loginUser.rejected, (state, {payload} ) => {
                state.isLoading = false;
                state.error = payload || 'Something went wrong'
            })
            //update
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, addCurrentUser)
            .addCase(updateUser.rejected, (state, {payload} ) => {
                state.isLoading = false;
                state.error = payload || 'Something went wrong'
            })
        }
    })
    
    export const {addItemToCart, toggleForm, toggleFormType, removeItemFromCart} = userSlice.actions

    export default userSlice.reducer