import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div>
        About Page
        <p>This is the about page of our application.</p>
        <NavLink to="/">Go to Home</NavLink>
        <p>Learn more about our application and its features.</p>
    </div>
  )
}
About.meta = {
  title: 'About Page',
  description: 'Learn more about us on the About Page',
  keywords: 'about, application, features',
  author: 'Your Name',
  robots: 'index, follow',
  ogUrl: 'https://react-ssr-7bu1.onrender.com/about', // Optional, if you have a specific URL for the page
  image: 'https://react-ssr-7bu1.onrender.com/chatimage2.jpg', // Optional, if you have an image for social sharing
  // image: 'https://react-ssr-7bu1.onrender.com/about2.jpeg', // Optional, if you have an image for social sharing
  // image: `${process.env.BASE_URL}/about2.jpeg`, // Optional, if you have an image for social sharing
  ogType: 'website', // Open Graph type
};

export default About