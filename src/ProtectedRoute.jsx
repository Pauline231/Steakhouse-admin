import { showProfile } from 'features/authSlice'
import { fetchProfile } from 'features/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProfile())
  },[]) 
  const profile = useSelector(showProfile)
  if(profile.role==='admin'){
    return (
      <>
      {children}
      </>
    )
  }else
  return (
    <>
    You are not allowed.
    
    </>
  )
}

export default ProtectedRoute