import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import './CreatePet.css';


function CreatePet() {
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [gender,setGender] = useState('');
  const [breed,setBreed] = useState('');
  const [email,setEmail] = useState('');
  const [city, setCity] = useState('');
  const [files,setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  async function addAPet(ev){
    const data = new FormData();
    data.set('name',name);
    data.set('age',age);
    data.set('gender',gender);
    data.set('breed',breed);
    data.set('email',email);
    data.set('city',city);
    data.append('file',files[0]);
    ev.preventDefault();
    console.log(files);
    try {
      
      const response=await fetch('https://pawmate-backend.onrender.com/upload',{
        method:'POST',
        headers:{ 
          "Authorization":"Bearer "+localStorage.getItem("token")
      },
        body: data
      })
      if(response.ok){
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  if(redirect){
    return <Navigate to={'/MyProfile'}/>
  }
  
  return (
    <div className="form-container">
      
  <form onSubmit={addAPet}>
  <h1>Add Your Pet!</h1>
    <input type="text" 
      placeholder="Pet Name"
      value={name}
      onChange={ev => setName(ev.target.value)} required/>
    <input type="number" 
      placeholder="Pet Age"
      value={age}
      onChange={ev => setAge(ev.target.value)} required/>
    <input type="text" 
      placeholder="Pet Gender"
      value={gender}
      onChange={ev => setGender(ev.target.value)} required/>
    <input type="text" 
      placeholder="Pet Breed"
      value={breed}
      onChange={ev => setBreed(ev.target.value)} required/>
    <input type="email"
      placeholder="Email"
      value={email}
      onChange={ev => setEmail(ev.target.value)} required/>
    <input type="text"
      placeholder="City"
      value={city}
      onChange={ev => setCity(ev.target.value)} required/>
    <input type="file"
      onChange={ev => setFiles(ev.target.files)} required/>
    <button style={{ marginTop: '5px' }}>Add Pet</button>
  </form>
</div>

  )
}

export default CreatePet
