import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

function EditDetails() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://pawmate-backend.onrender.com/upload/${id}`,{
      headers:{ 
        "Authorization":"Bearer "+localStorage.getItem("token")
    },
    })
      .then(response => response.json())
      .then(petInfo => {
        setName(petInfo.name);
        setAge(petInfo.age);
        setGender(petInfo.gender);
        setBreed(petInfo.breed);
        setEmail(petInfo.email);
        setCity(petInfo.city);
      });
  }, [id]);

  async function EditPet(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('age', age);
    data.append('gender', gender);
    data.append('breed', breed);
    data.append('email', email);
    data.append('city',city);
    data.append('id', id);
    if (files) data.append('file', files);

    const res = await fetch('https://pawmate-backend.onrender.com/upload', {
      method: 'PUT',
      headers:{ 
        "Authorization":"Bearer "+localStorage.getItem("token")
    },
      body: data,
    });

    if (res.ok) {
      alert("Successfully updated!");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/MyProfile`} />;
  }

  return (
    <div className="form-container">
      <form onSubmit={EditPet}>
      <h1>Edit Details</h1>
      <input type="text" placeholder="Pet Name" value={name} onChange={ev => setName(ev.target.value)} required/>
      <input type="text" placeholder="Pet Age" value={age} onChange={ev => setAge(ev.target.value)} required/>
      <input type="text" placeholder="Pet Gender" value={gender} onChange={ev => setGender(ev.target.value)} required/>
      <input type="text" placeholder="Pet Breed" value={breed} onChange={ev => setBreed(ev.target.value)} required/>
      <input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} required/>
      <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)} required/>
      <input type="file" onChange={ev => setFiles(ev.target.files?.[0])} required/>
      <button style={{ marginTop: '5px' }}>Update Details</button>
    </form>

    </div>
    
  );
}

export default EditDetails;
