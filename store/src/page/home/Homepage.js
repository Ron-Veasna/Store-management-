import React from 'react'
import "./homepage.css"
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const navigate = useNavigate()
const OnClick = () =>{
  navigate("/customer")
}
  return (
    <div>
      <h1 onClick={OnClick}>Home Page</h1>
    </div>
  )
}

export default Homepage