import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "constant/constant";
import { APIAuthenticated } from "http/Api";

export const productSlice = createSlice({
    name : 'product',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        realStatus : '',
        productSingle :[],
        productOrders : [],
        productReviews :[]
    },
    reducers:{
        clearRealStaus(state,action){
            state.realStatus = ''
        },
        deleteProductInState(state,action){
            const {productId} = action.payload
            const index = state.data.findIndex((item)=>item._id=== productId)
            if(index !== -1){
                state.data.splice(index,1)
            }
        },
        deleteReviewInState(state,action){
            const id = action.payload
            const index = state.productReviews.findIndex((item)=>item._id===id)
            if(index !== -1){
                state.productReviews.splice(index,1)
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchAllProducts.pending, (state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchAllProducts.rejected, (state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.status = STATUS.SUCCESS
            state.data = action.payload
        })
        .addCase(updateSingleProduct.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(updateSingleProduct.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(updateSingleProduct.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.realStatus = action.payload
        })
        .addCase(addProduct.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(addProduct.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.realStatus = action.payload
        })
        .addCase(fetchSingleProduct.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchSingleProduct.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            const {data,productOrders,reviews} = action.payload
            state.productSingle = []
            state.productSingle = data
            state.productReviews = reviews
            state.productOrders = productOrders
        })
        .addCase(deleteProduct.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(deleteProduct.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(deleteProduct.fulfilled,(state)=>{
            state.status = STATUS.SUCCESS
        })
        .addCase(deleteReview.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(deleteReview.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(deleteReview.fulfilled,(state)=>{
            state.status = STATUS.SUCCESS
        })
    }
})

export const showAllProducts = (state) => state.products.data
export const showProductrealStatus = (state) => state.products.realStatus
export const showSingleProduct = (state) => state.products.productSingle
export const showProductOrders = (state) => state.products.productOrders
export const showProductReviews = (state) => state.products.productReviews
export const {clearRealStaus, deleteProductInState, deleteReviewInState } =productSlice.actions

export default productSlice.reducer

export const fetchAllProducts = createAsyncThunk("fetch/allproducts",async()=>{
    const response = await APIAuthenticated.get('/products')
    const data = response.data.data 
    return data
})

export const updateSingleProduct = createAsyncThunk('update/singleProduct', async({id,completedata})=>{
    const response = await APIAuthenticated.patch(`/products/${id}`,completedata,{
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.status
})

export const addProduct = createAsyncThunk('add/product',async(completedata)=>{
    const response = await APIAuthenticated.post('/products', completedata,{
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.status
})

export const fetchSingleProduct = createAsyncThunk('fetch/singleProduct',async(id)=>{
    const response = await APIAuthenticated.get(`/products/${id}`)
    const data = response.data.data
    const reviews = response.data.reviews
    const productOrders = response.data.orders
    return {data,reviews,productOrders}
})

export const deleteProduct = createAsyncThunk('delete/product', async(id,{dispatch})=>{
    const response = await APIAuthenticated.delete(`/products/${id}`)
    dispatch(deleteProductInState({productId : id}))
    return response.data
})

export const deleteReview = createAsyncThunk('fetch/reviews', async(id,{dispatch})=>{
    const response = await APIAuthenticated.delete(`reviews/${id}`)
    dispatch(deleteReviewInState(id))
    return id
})