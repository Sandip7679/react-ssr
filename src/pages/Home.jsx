import React from 'react'
import '../index.css'

import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
       <div> Home Page</div>
        <NavLink to="/about">Go to About</NavLink>
    </div>
  )
}

Home.meta = {
  title: 'Home Page',
  description: 'Welcome to the Home Page'
};

export default Home