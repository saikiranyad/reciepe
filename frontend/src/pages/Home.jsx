import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector((state) => state.user.user);
    console.log(user)
  return (
    <div>Home</div>
  )
}

export default Home