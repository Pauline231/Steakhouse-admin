import { showProductOrders } from 'features/productSlice'
import { fetchSingleProduct } from 'features/productSlice'
import { deleteProduct } from 'features/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ProductOrders = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
	dispatch(fetchSingleProduct(id))
  },[])


    const productOrders = useSelector(showProductOrders)
    console.log(productOrders)
	const [searchTerm, setSearchTerm] = useState('')
	const [date, setDate] = useState('')


	{/*const filteredProducts = products?.filter((product)=>product._id.toLowerCase().includes(searchTerm.toLowerCase())||
			product.productName.toLowerCase().includes(searchTerm.toLowerCase())||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
	)
	.filter((product)=>date ===''|| new Date(product.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())
*/}
	const handleDelete = (id)=>{
		dispatch(deleteProduct(id))
	}

  return (
    <>
    	
<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-rose-800 font-montserrat  font-semibold">Products</h2>
			<span className="text-sm text-emerald-400 font-palanquin">All orders on this product</span>
		</div>	
		{/*<div className="flex items-center justify-between">
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
  </div>*/}
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr >
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider">
									Order Id
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Address
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Phone Number
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Status
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Ordered by
								</th>
								<th
									className="px-5 py-3 border-b-2 font-montserrat text-rose-800 border-gray-200 bg-gray-100 text-left text-xs font-semibold  uppercase tracking-wider">
									Price
								</th>
							</tr>
						</thead>
						<tbody>
                        {productOrders.map((order)=>(
                            <tr key={order._id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p onClick={()=>navigate(`/admin/orders/${order._id}`)} className="text-yellow-400 underline font-montserrat hover:text-blue-600 hover:cursor-pointer  whitespace-no-wrap">{order._id}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-palanquin whitespace-no-wrap">
                                    {order.shippingAddress}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-montserrat whitespace-no-wrap">
                                   {order.phoneNumber}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-montserrat font-semibold text-green-900 leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                <span className="relative">{order.paymentDetails.status}</span>
                                </span>
                            </td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-rose-800 font-palanquin whitespace-no-wrap">
                                   {order.user.userName}
                                </p>
                            </td>
							<td className="px-5 py-5 border-b flex flex-row justify-start border-gray-200 bg-white text-sm">
                            <p className="text-rose-800 font-palanquin whitespace-no-wrap">
                                   {order.totalAmount}
                                </p>
							
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

export default ProductOrders