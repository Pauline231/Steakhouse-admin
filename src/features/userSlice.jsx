import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "constant/constant";
import { APIAuthenticated } from "http/Api";

export const userSlice = createSlice({
    name : 'user',
    initialState : {
        data : [],
        status : STATUS.SUCCESS
    },
    reducers:{
        deleteUserinState(state,action){
            const id = action.payload 
            const index = state.data.findIndex((item)=>item._id=== id)
            if(index !== -1){
                state.data.splice(index,1)
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchAllUsers.pending, (state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchAllUsers.rejected, (state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchAllUsers.fulfilled, (state,action)=>{
            state.status = STATUS.SUCCESS
            state.data = action.payload
        })
        .addCase(deleteUser.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(deleteUser.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(deleteUser.fulfilled,(state)=>{
            state.status = STATUS.SUCCESS
        })
    }
})

export const showAllUsers = (state) => state.users.data

export const {deleteUserinState} = userSlice.actions

export default userSlice.reducer

export const fetchAllUsers = createAsyncThunk("fetch/allusers",async()=>{
    const response = await APIAuthenticated.get('/admin/users')
    const data = response.data.data 
    return data
})

export const deleteUser = createAsyncThunk('delete/user',async(id,{dispatch})=>{
    const response = await APIAuthenticated.delete(`/admin/users/${id}`)
    dispatch(deleteUserinState(id))
    return response.status
})