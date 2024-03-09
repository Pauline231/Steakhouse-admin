import { compress } from 'constant/compress'
import { clearRealStaus } from 'features/productSlice'
import { showProductrealStatus } from 'features/productSlice'
import { addProduct } from 'features/productSlice'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {
    const [selectedImage, setSelectedImage] = useState();
    const [compressedImg, setCompressedImg] = useState()

    // This function will be triggered when the file field change
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
      return setSelectedImage();
    };
    
    const canShow = Boolean(selectedImage)&&Boolean(compressedImg)
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const realStatus = useSelector(showProductrealStatus)
    const {register, handleSubmit, formState} = useForm()

    //to compress the image before upload
    selectedImage && compress(selectedImage, function(result){
      compressedImg? console.log('done') : setCompressedImg(result)
     })
    const handleProduct = (data) =>{
       const completeData = {...data,productImage : compressedImg}
        dispatch(addProduct(completeData))
    }
    if(realStatus === 200){
        navigate('/admin/products')
        dispatch(clearRealStaus())
    }

  return (
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
              placeholder="your product name"
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
              id="description   "
              placeholder="Provide the description of your product."
              {...register('productDescription',{required: 'Description of the product is required.'})}
              className="w-full rounded-md border h-[250px] border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <p className='text-red-700'>{formState.errors.productDescription && formState.errors.productDescription.message}</p>
          </div>

          <div className='mb-5 flex justify-evenly'>
            <div className='flex flex-col items-center'>
                <label htmlFor='productQty' className=''>Stock</label>
                <input id='productQty' name='productQty' {...register('productQty',{required:'Product quantity is required.'})} type='number' className='border mt-1 px-3 py-2.5 w-20 rounded-md border-[#e0e0e0]'/>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor='productPrice' className=''>Price</label>
                <input id='productPrice' name='productPrice' {...register('productPrice',{required:'Product price is required.'})} type='number' className='border mt-1 px-3 py-2.5 w-20  rounded-md border-[#e0e0e0]'/>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor='productStatus' className=''>Status</label>
                <select id='orderStatus' {...register('productStatus',{required:"Product Status is required"})}
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
            <input type='file' onChange={imageChange} />
            </div>
            <div >
              {selectedImage&& <img src={URL.createObjectURL(selectedImage)} alt='productImg' height={280} width={280} />}  
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
  )
}

export default AddProduct