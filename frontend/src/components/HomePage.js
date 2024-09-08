import React from 'react'
import './Home.css';

function HomePage() {
  return (
    <div className="home-section">
      <div className="content">
        <h1>Welcome to PawMate!</h1>
        <p>We are your trusted partner in finding the perfect match for your beloved pets. Our mission is to simplify the search for dog owners looking to connect with pets of specific breeds, ages, and other criteria for breeding purposes. We understand the challenges of finding the right mate for your pet, and we're here to make the process easier and more efficient.</p>
      </div>
      <div className="image">
        <img src={require('./labdog.jpg')} alt="PawMate" />
      </div>
    </div>
  )
}

export default HomePage;