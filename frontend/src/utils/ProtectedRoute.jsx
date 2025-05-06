import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {isAutenticated} = useSelector((state)=>state.user)
  return isAutenticated ? children : <Navigate to='/login'/>
}

export default ProtectedRoute
