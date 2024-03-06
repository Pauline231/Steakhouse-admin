import { deleteReview } from 'features/productSlice'
import { showProductReviews } from 'features/productSlice'
import { fetchSingleProduct } from 'features/productSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { StarRating } from 'star-ratings-react'

const ProductReviews = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(()=>{
    dispatch(fetchSingleProduct(id))
  })
  const reviews = useSelector(showProductReviews)
  const handleDelete = (id) =>{
    dispatch(deleteReview(id))
  }

  return (
   <>
   <div className='flex flex-row flex-wrap gap-10'>
   {reviews.map((review)=>(
     <div key={review._id} className="relative flex w-96 transform overflow-hidden flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
     <div className="p-6">
       <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
         <StarRating rating={review.rating} maxRating={5} size={20}/>
       </h5>
       <p className="block font-montserrat text-base font-light leading-relaxed text-inherit antialiased">
       {review.message}
       </p>
     </div>
     <div className='flex flex-row justify-between'>
     <div className="ml-10">
                   			 <button className="" onClick={()=>handleDelete(review._id)} >
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
     <div className="p-6  self-end pt-0">
      <p className='text-rose-800 font-montserrat '>...by @{review.userID.userName}</p>
     </div>
   </div>
   </div>
   
   ))}
  
  </div>
   </>
  )
}

export default ProductReviews