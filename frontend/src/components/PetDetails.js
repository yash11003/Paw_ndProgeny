import React from 'react';
import { Link } from 'react-router-dom';
import './PetDetails.css';

function PetDetails({ pet }) {
    const { cover, _id } = pet;
    return (
        <div className="petCard">
          <img src={'https://pawmate-backend.onrender.com/' + cover} alt={pet.name} className="petImage" />
            <div className="petDetails">
                <h2 className="petName">{pet.name}</h2>
                <p className="petBreed"><strong>Breed: </strong> {pet.breed}</p>
                <p className="petGender"><strong>Gender: </strong> {pet.gender}</p>
                <Link to={`/upload/${_id}`}>
                    <button className="detailsButton">View Details</button>
                </Link>
            </div>
        </div>
    );
}

export default PetDetails;
