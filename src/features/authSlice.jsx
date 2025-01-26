import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "constant/constant";
import { APIAuthenticated } from "http/Api";
import { API } from "http/Api";


export const authSlice = createSlice({
    name : 'auth',
    initialState :{
        data : [],
        status : STATUS.SUCCESS,
        token : '',
        realStatus :''
    },
    reducers:{
        setData (state,action){
            state.data = action.payload
            state.status = STATUS.SUCCESS
        }
    },
    extraReducers(builder){
        builder
        .addCase(LogInfirst.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(LogInfirst.rejected,(state)=>{
            state.status = STATUS.ERROR
            alert("Log in error")
        })
        .addCase(LogInfirst.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.token = action.payload
            localStorage.setItem('token',action.payload)
            window.location.href = "/admin"
        })
        .addCase(fetchProfile.pending,(state)=>{
            state.status = STATUS.LOADING
        })
        .addCase(fetchProfile.rejected,(state)=>{
            state.status = STATUS.ERROR
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.status = STATUS.SUCCESS
            state.data = action.payload
        })
    }
})

export const showToken = (state)=> (state.auth.token)
export const showProfile = (state) =>(state.auth.data)
export default authSlice.reducer

export const LogInfirst = createAsyncThunk('login/admin', async(loginData)=>{
    const response = await API.post('/auth/login', loginData)
    const data = response.data.data 
    return data
} )

export const fetchProfile = createAsyncThunk('fetch/profile', async()=>{
    const response = await APIAuthenticated('/user/profile')
    const data = response.data.data
    return data
})