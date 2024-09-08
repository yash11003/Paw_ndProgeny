import React, { useState } from 'react';
import PetDetails from './PetDetails';
import './Search.css';

function Search() {
  const [breed, setBreed] = useState('');
  const [place, setPlace] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [pets, setPets] = useState([]);
  const [searched, setSearched] = useState(false); 

  const handleSearch = async () => {
    try {
      setSearched(true);

      const query = new URLSearchParams({
        breed,
        place,
        gender,
        age,
      }).toString();

      const response = await fetch(`https://pawmate-backend.onrender.com/search?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error searching for pets:', error);
      setPets([]);
    }
  };

  return (
    <div>
      <div className='search'>
        <h2>Search Pets</h2>
        <div>
          <div>
            <label>
              Breed Name:
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </label>
            <label>
              Place Name:
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Gender:
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>
        </div>
        <br/>
        <button onClick={handleSearch}>Search</button>
      </div>
  
      <div>
        {searched && pets.length === 0 ? (
          <h1 className="no-pets-message">No pets found.</h1>
        ) : (
          pets.length > 0 && pets.map(pet => (
            <PetDetails key={pet._id} pet={pet} />
          ))
        )}
      </div>
    </div>
  );
  
}

export default Search;
