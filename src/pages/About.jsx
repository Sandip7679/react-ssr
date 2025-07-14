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
  description: 'Learn more about us on the About Page'
};

export default About