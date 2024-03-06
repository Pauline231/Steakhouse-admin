import React, { useEffect, useState } from 'react'
import {  useParams, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleOrder } from 'features/orderSlice'
import { showSingleOrder } from 'features/orderSlice'
import { updateSingleOrder } from 'features/orderSlice'
import { updatePaymentStatus } from 'features/orderSlice'
import { deleteOrder } from 'features/orderSlice'
import { socket } from 'App'


const SingleOrder = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
        dispatch(fetchSingleOrder(id))
    },[])

    const order = useSelector(showSingleOrder)


    const subtotal = order.items?.reduce((amount, item)=> item.quantity * item.product?.productPrice + amount, 0) 


    const OStatusChange = (status)=>{
        socket.emit('updateOrderStatus',{
          status : status,
          orderId : id,
          userId : order.user._id
        })
        dispatch(updateSingleOrder({id, data :status}))
    }
     const oStatus = order?.orderStatus
     const pStatus = order.paymentDetails?.status

     const PStatusChange = (pStatus) =>{
        dispatch(updatePaymentStatus({id, data: pStatus}))
     }

     const handleDelete = ()=>{
        dispatch(deleteOrder(id))
     }
    {/*const handleDelete = async()=>{
        try {
            const response = await APIAuthenticated.delete(`/user/order/${id}`)
            if(response.status ==200){
                navigate('/myorders')
            }
        } catch (error) {
            console.log(error)
        }
    }*/}

   // const condition = Boolean(['pending','processing'].includes(.orderStatus))
   // console.log(condition)
    
  return (
    <>
<div className=" py-4 px-4 md:px-6 2xl:px-20  2xl:mx-auto">

  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-3xl text-rose-800 font-montserrat lg:text-xl font-semibold leading-7 lg:leading-9">Order {id}</h1>
    <p className="text-base  font-medium font-palanquin leading-6 text-gray-900"></p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start  bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl font-semibold font-montserrat leading-6 xl:leading-5 text-rose-800"> Cart</p>
      {order.items?.map((item)=>(
          <div key={item.product?.productName} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src={item.product?.productImage} alt="productimage" />
            <img className="w-full md:hidden" src={item.product?.productImage} alt="productimage" />
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-md font-semibold font-montserrat leading-6 text-gray-800">{item.product?.productName}</h3>
            </div>
            <div className="flex justify-between  space-x-8 items-start w-full">
              <p className="text-base font-montserrat text-gray-800 xl:text-lg leading-6">Rs.{item.product?.productPrice} <span className="text-yellow-400 line-through"> 10%</span></p>
              <p className="text-base font-montserrat text-gray-800 xl:text-lg leading-6 ">{item.quantity}</p>
              <p className="text-base font-montserrat text-rose-800 xl:text-lg font-semibold leading-6 ">Rs.{item.quantity * item.product?.productPrice} </p>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white space-y-6">
          <h3 className="text-xl  font-semibold font-montserrat leading-5 text-rose-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-baset text-gray-800 font-palanquin leading-4 ">Subtotal</p>
              <p className="text-base font-montserrat leading-4 text-gray-600">{subtotal}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base  font-palanquin leading-4 text-gray-800">Discount </p>
              <p className="text-base font-montserrat leading-4 text-gray-600">Rs.0.00</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base font-palanquin leading-4 text-gray-800">Shipping</p>
              <p className="text-base  font-montserrat leading-4 text-gray-600">Rs.100</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base  font-montserrat font-semibold leading-4 text-rose-800">Total</p>
            <p className="text-base font-montserrat font-semibold leading-4 text-rose-800">Rs.{subtotal + 100}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-white space-y-6">
          <h3 className="text-xl font-montserrat font-semibold leading-5 text-rose-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6  font-semibold font-palanquin text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6  text-gray-800">Rs.100</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">{order.paymentDetails?.status.toUpperCase()}</button>
          </div>
        </div>
      </div>
    </div>
    <div className=" bg-white w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl font-semibold leading-5 text-rose-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base font-semibold leading-4 text-left text-gray-800">ID:{order.user?._id}<br/>{order.user?.userName?.toUpperCase()}</p>
              <p className="text-sm leading-5 text-gray-600">Phone Number: {order.user?.userPhoneNumber} </p>
            </div>
          </div>

          <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {order.user?.userEmail}
          </div>
        </div>
        <div className="flex justify-start gap-5 xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base  font-semibold leading-4 text-center md:text-left font-montserrat text-rose-800">Shipping Address</p>
              <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 font-palanquin text-gray-800">{order.shippingAddress}</p>
            </div>
          </div>
          <div>
          <div className="flex w-full flex-col md:justify-start md:items-start">
          <div className="relative h-10 mb-2 flex items-center justify-start w-60 min-w-[200px]">
        <label htmlFor='orderStatus' className='text-sm mb-2'>Order Status</label>
        <select id='orderStatus' value={oStatus} onChange={(e)=>OStatusChange(e.target.value)}
             className="peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
             <option value="pending">Pending</option>
             <option value="processing">Processing</option>
             <option value="ontheway">OntheWay</option>
             <option value="delivered">Delivered</option>
             <option value="cancelled">Cancelled</option>
        </select>
            </div>
        <div className="relative h-10 mb-2 flex items-center justify-start w-60 min-w-[200px]">
        <label htmlFor='paymentStatus' className='text-sm mb-2'>Payment</label>
        <select id='paymentStatus' value={pStatus} onChange={(e)=>PStatusChange(e.target.value)}
             className="peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
             <option value="pending">Pending</option>
             <option value="paid">Paid</option>
             <option value="unpaid">Unpaid</option>
        </select>
      
            </div>
           </div>
          <div  className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button onClick={handleDelete} className="mt-6 md:mt-0 dark:border-white font-montserrat hover:bg-yellow-400 hover:text-white py-5 bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-white">Delete Order</button>
          </div>
          </div>
        
        </div>
        
      </div>
    </div>
  </div>
</div>
      
    </>
  )
}

export default SingleOrder