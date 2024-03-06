import { orderpic } from 'constant/constant'
import { reviewpic } from 'constant/constant'
import { showProductrealStatus } from 'features/productSlice'
import { showAllProducts } from 'features/productSlice'
import { deleteProduct } from 'features/productSlice'
import { fetchAllProducts } from 'features/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
	dispatch(fetchAllProducts())
  },[])
  const products = useSelector(showAllProducts)
	const [searchTerm, setSearchTerm] = useState('')
	const [date, setDate] = useState('')

	const filteredProducts = products?.filter((product)=>product._id.toLowerCase().includes(searchTerm.toLowerCase())||
			product.productName.toLowerCase().includes(searchTerm.toLowerCase())||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
	)
	.filter((product)=>date ===''|| new Date(product.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())

	const handleDelete = (id)=>{
		dispatch(deleteProduct(id))
	}

  return (
    <>
    	
<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-rose-800 font-montserrat  font-semibold">Products</h2>
			<span className="text-sm text-emerald-400 font-palanquin">All  of your products</span>
		</div>	
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<input onChange={(e)=>setDate(e.target.value)} className="bg-gray-50 placeholder-font-palanquin outline-none ml-1 block " type="date" value={date} name="" id="" />
          </div>
		  <div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd" />
				</svg>
				<input onChange={(e)=>setSearchTerm(e.target.value)} className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr >
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider">
									Product ID
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Product Name 
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Product Quantity
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Status
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Price
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
                        {filteredProducts.map((product)=>(
                            <tr key={product._id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p onClick={()=>navigate(`/admin/products/${product._id}`)} className="text-yellow-400 underline font-montserrat hover:text-blue-600 hover:cursor-pointer  whitespace-no-wrap">{product._id}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-palanquin whitespace-no-wrap">
                                    {product.productName}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-montserrat whitespace-no-wrap">
                                   {product.productQty}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-montserrat font-semibold text-green-900 leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                <span className="relative">{product.productStatus}</span>
                                </span>
                            </td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-palanquin whitespace-no-wrap">
                                   Rs.{product.productPrice}
                                </p>
                            </td>
							<td className="px-5 py-5 border-b flex flex-row justify-evenly border-gray-200 bg-white text-sm">
							<div className="self-center">
                   			 <button className="" onClick={()=>handleDelete(product._id)} >
                       	 	<svg className="" height="24px" width="24px" id="Layer_1" style={{'enablebackground':"new 0 0 512 512"}} version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                       		<g>
                            <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z"/>
                            <g>
                            <rect height="241" width="14" x="249" y="160"/>
                            <polygon points="320,160 305.4,160 294.7,401 309.3,401"/>
                            <polygon points="206.5,160 192,160 202.7,401 217.3,401"/>
                            </g>
                       		 </g>
                        	</svg>
                   			 </button>
               			 </div>
							<div className="self-center">
                   			 <button className="" onClick={()=>navigate(`/admin/products/${product._id}/reviews`)} >
								<img src={reviewpic} width={30}/>
                   			 </button>
               			 </div>
							<div className="self-center">
                   			 <button className="" onClick={()=>navigate(`/admin/products/${product._id}/orders`)} >
								<img src={orderpic} width={25} height={10}/>
                   			 </button>
               			 </div>

                            </td>
                        </tr>
                                    
                        ))}
							
                    </tbody>
                    </table>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}

export default Products