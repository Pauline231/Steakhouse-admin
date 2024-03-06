import { clearRealStaus } from 'features/productSlice'
import { updateSingleProduct } from 'features/productSlice'
import { showAllProducts } from 'features/productSlice'
import { showProductrealStatus } from 'features/productSlice'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


const SingleProduct = () => {

    const {id} = useParams()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const products = useSelector(showAllProducts)
    const [singleProduct] = products?.filter((product)=>product._id === id)

    const realStatus = useSelector(showProductrealStatus)
    const {register, handleSubmit, formState} = useForm()
    const [selectedImage, setSelectedImage] = useState();

    // This function will be triggered when the file field change
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
      setSelectedImage();
    };
    const canShow = Boolean(selectedImage)
    const handleProduct = (data) =>{
        const completedata = {...data,productImage : selectedImage}
        dispatch(updateSingleProduct({id,completedata}))
    }
    if(realStatus === 200){
        navigate('/admin/products')
        dispatch(clearRealStaus())
    }

  return (
    <div>
        <div className="flex justify-start item-start space-y-2 flex-col">
      <h1 className="text-xl text-rose-800 font-montserrat lg:text-xl font-semibold leading-7 lg:leading-9">Product<br/>{id}</h1>
     <p className="text-base  font-medium font-palanquin leading-6 text-gray-900"></p>
        </div>
   
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit((data)=>{handleProduct(data)})} >
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
              Name
            </label>
            <input
              type="texty"
              name="productName"
              id="productName"
              defaultValue={singleProduct.productName}
              {...register('productName',{required: 'Name of the product is required.'})}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className='text-red-700'>{formState.errors.productName && formState.errors.productName.message}</p>
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                Description
            </label>
            <input
              type='text'
              name="description"
              id="description"
              placeholder="Provide the description of your product."
              defaultValue={singleProduct.productDescription}
              {...register('productDescription',{required: 'Description of the product is required.'})}
              className="w-full rounded-md border h-[250px] border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className='text-red-700'>{formState.errors.productDescription && formState.errors.productDescription.message}</p>
          </div>

          <div className='mb-5 flex justify-evenly'>
            <div className='flex flex-col items-center'>
                <label htmlFor='productQty' className=''>Stock</label>
                <input id='productQty' name='productQty' defaultValue={singleProduct.productQty} {...register('productQty',{required:'Product quantity is required.'})} type='number' className='border mt-1 px-3 py-2.5 w-20 rounded-md border-[#e0e0e0]'/>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor='productPrice' className=''>Price</label>
                <input id='productPrice' name='productPrice' defaultValue={singleProduct.productPrice} {...register('productPrice',{required:'Product price is required.'})} type='number' className='border mt-1 px-3 py-2.5 w-20  rounded-md border-[#e0e0e0]'/>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor='productStatus' className=''>Status</label>
                <select id='orderStatus' defaultValue={singleProduct.productStatus} {...register('productStatus',{required:"Product Status is required"})}
             className="peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
             <option value="available">Available</option>
             <option value="unavailable">Out of stock</option>
                 </select>
            </div>
          </div>
          <p className='text-red-700'> {formState.errors.productQty && formState.errors.productQty.message}
            {formState.errors.productPrice && formState.errors.productPrice.message}
            {formState.errors.productStatus && formState.errors.productStatus.message}</p> 
    
          <div className="mb-6 flex flex-col items-center pt-4">
            <label className="mb-5 block text-xl  text-[#07074D]">
              Photo
            </label>
            <div>
            <img src={singleProduct.productImage} height={280} width={280}/>
            </div>
            <div>
            <input type='file' onChange={imageChange} />
            </div>
            <div >
              {selectedImage&& <img src={URL.createObjectURL(selectedImage)}  height={280} width={280} />}  
              {canShow?<div>
              <button onClick={removeSelectedImage} disabled={!canShow} className= 'bg-red-500 text-white rounded-md px-3 py-1'>Remove this image</button>
              </div>:null}
            </div>
        
          </div>
    
          <div>
            <button type='submit'
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Send File
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SingleProduct