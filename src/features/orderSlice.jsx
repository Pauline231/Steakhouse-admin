import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "constant/constant";
import { APIAuthenticated } from "http/Api";

export const orderSlice = createSlice({
    name : 'order',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        singleOrder : []
    },
    reducers:{
        deleteOnState(state,action){
            const{orderId} = action.payload
            console.log(orderId)
            const index = state.data.findIndex((item)=>item._id===orderId)
            console.log(index)
            if(index !== -1){
                state.data.splice(index,1)
            }

        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchAllOrders.pending, (state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchAllOrders.rejected, (state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchAllOrders.fulfilled, (state,action)=>{
            state.status = STATUS.SUCCESS
            state.data = action.payload
        })
        .addCase(fetchSingleOrder.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchSingleOrder.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchSingleOrder.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.singleOrder = action.payload
        })
        .addCase(updateSingleOrder.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(updateSingleOrder.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(updateSingleOrder.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.singleOrder = action.payload
        })
        .addCase(deleteOrder.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(deleteOrder.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(deleteOrder.fulfilled,(state)=>{
            state.status = STATUS.SUCCESS
        })
        .addCase(updatePaymentStatus.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(updatePaymentStatus.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(updatePaymentStatus.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.singleOrder = action.payload
        })
    }
})

export const showAllOrders = (state) => state.order.data
export const {deleteOnState} = orderSlice.actions
export const showSingleOrder = (state) => state.order.singleOrder

export default orderSlice.reducer

export const fetchAllOrders = createAsyncThunk("fetch/allorders",async()=>{
    const response = await APIAuthenticated.get('/admin/order')
    const data = response.data.data 
    return data
})

export const fetchSingleOrder = createAsyncThunk("fetch/singleOrder",async(id)=>{
    console.log(id)
    const response = await APIAuthenticated.get(`/admin/order/${id}`)
    console.log(response)
    const data = response.data.data
    return data
})

export const updateSingleOrder = createAsyncThunk('update/singleOrderStatus',async({id,data})=>{
    console.log(id)
    console.log(data)
    const response = await APIAuthenticated.patch(`/admin/order/${id}`,{orderStatus : data})
    const updatedOrder = response.data.data
    return updatedOrder
})

export const updatePaymentStatus = createAsyncThunk('update/paymentStatus',async({id,data})=>{
    const response = await APIAuthenticated.patch(`/admin/order/payment/${id}`,{paymentStatus :data})
    const updatedOrder = response.data.data
    return updatedOrder
})

export const deleteOrder = createAsyncThunk('delete/singleOrder',async(id,{dispatch})=>{
    const response = await APIAuthenticated.delete(`/admin/order/${id}`)
    dispatch(deleteOnState({orderId: id}))
    return response.data
})