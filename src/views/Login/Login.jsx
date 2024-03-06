import { LogInfirst } from 'features/authSlice'
import { showToken } from 'features/authSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {
    const token = useSelector(showToken)
    const dispatch = useDispatch()
    const [logindata, setLogInData] = useState({
        email : '',
        password :''
    })
    const handleChange = (e)=>{
        const{name, value} = e.target
        setLogInData({
            ...logindata,
            [name] : value
        })
    }    
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(LogInfirst(logindata))
    }
  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center'>
    <div className="text-center mt-5">
    <div className="flex items-center justify-center">
    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-rose-800" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
    </div>
    <h2 className="text-4xl font-montserrat text-rose-800 tracking-tight">
         Sign in into your account
    </h2>
    <span className="text-sm text-emerald-400">or <a  className="text-yellow-400 hover:underline hover:cursor-pointer"> 
         register a new account
    </a>
    </span>
    </div>
<div className="flex justify-center my-2 mx-4 md:mx-0">
   <form  onSubmit={(e)=>handleSubmit(e)} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap -mx-3 mb-6">
         <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-rose-800 text-xs font-bold mb-2" htmlFor='email'>Email address</label>
            <input onChange={handleChange} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-rose-800 rounded-lg py-3 px-3 leading-tight focus:outline-none" name='email' type='email' id='email'  required/>
         </div>
         <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-rose-800 text-xs font-bold mb-2" htmlFor='password'>Password</label>
            <input onChange={handleChange} className="appearance-none block w-full bg-white text-gray-900 font-medium border border-rose-800 rounded-lg py-3 px-3 leading-tight focus:outline-none" name='password' type='password' id='password' required/>
         </div>
         <div className="w-full flex items-center justify-between px-3 mb-3 ">
            <label htmlFor="remember" className="flex items-center w-1/2">
               <input type="checkbox" name="remember" id="remember" className="mr-1 bg-white shadow"/>
               <span className="text-sm text-rose-800 pt-1">Remember Me</span>
            </label>    
         </div>
         <div className="w-full md:w-full px-3 mb-6">
            <button className="appearance-none block w-full bg-yellow-400 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:text-gray-900 focus:outline-none focus:bg-white focus:border-gray-500">Sign in</button>
         </div>
      </div>
   </form>
</div>
</div>
    </>
  )
}
export default Login