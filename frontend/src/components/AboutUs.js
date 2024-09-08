import React from 'react'
import './AboutUs.css';

function AboutUs() {
  return (
    <div class="about-section">
        <div class="content">
            <h1>| About Us</h1>
            <p>Welcome to PawMate, where we make it easy for dog owners to find the perfect breeding partners for their pets. Join us today and simplify your finding process!</p>
        </div>
        <div class="why">
            <h2>| Why PawMate</h2>
            <div class="service">
                <h3>User-friendly Interface</h3>
                <p>Our website is designed to be intuitive and easy to navigate, ensuring a hassle-free experience for all users.</p>
            </div>
            <div class="service">
                <h3>Comprehensive Database</h3>
                <p>We maintain a detailed and extensive database of pets, increasing the chances of finding the ideal match for your breeding needs.</p>
            </div>
            <div class="service">
                <h3>Advanced Search</h3>
                <p>Find the right match for your pet with our advanced search functionality.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs