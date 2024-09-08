import React, { useEffect, useState } from 'react';
import PetDetails from './PetDetails';
import './MyProfile.css';
import { useContext } from 'react';
import {UserContext} from '../UserContext'
function MyProfile() {
    const [pets, setPets] = useState([]);
    const userData = useContext(UserContext)
    console.log(JSON.stringify(userData));
    
    useEffect(() => {
        try {
            async function FetchDetails(){

                console.log(document.cookie);
                
                const res = await fetch('https://pawmate-backend.onrender.com/myPets', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                });
                const data = await res.json()
                console.log(data);
                setPets(data);
            }
            FetchDetails()
        } catch (error) {
            console.log(error);
            
        }
        
    }, []);


    return (
        <div> 
            {pets.length > 0 ? (
                pets.map(pet => (
                    <PetDetails key={pet._id} pet={pet} />
                ))
            ) : (
                <h1 className="no-pets-message">No pets found, Try adding your pet details!</h1>
            )}
        </div>
    );
}

export default MyProfile;
