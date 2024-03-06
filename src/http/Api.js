import axios from "axios";

export const API = axios.create({
    baseURL : 'https://steakhouse-backend.onrender.com/api',
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json'        
    }
})

export const APIAuthenticated = axios.create({
    baseURL : 'https://steakhouse-backend.onrender.com/api',
    headers :{
        "Content-Type" :"application/json",
        Accept : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`
    }
})