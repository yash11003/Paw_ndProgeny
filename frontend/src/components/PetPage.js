import {useEffect, useState,useContext} from 'react'
import { useParams,Link,Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PetPage() {
    const [petInfo,setPetInfo] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
  useEffect(() => {
    fetch(`https://pawmate-backend.onrender.com/upload/${id}`,{
      headers:{ 
        "Authorization":"Bearer "+localStorage.getItem("token")
    },
    })
      .then(response => {
        response.json().then(petInfo => {
          setPetInfo(petInfo);
        });
      });
  }, [id]);

  const Delete = async () => {
    const response = await fetch(`https://pawmate-backend.onrender.com/delete/${id}`, {
      method: 'DELETE',
      headers:{ 
        "Authorization":"Bearer "+localStorage.getItem("token")
    },
    });

    if(response.ok){
      setRedirect(true);
    }}

  if (redirect) {
    return <Navigate to={`/MyProfile`} />;
  }

  if (!petInfo) return '';
  return (
    <div className="pet-card">
      <div className="pet-image">
      <h2>{petInfo.name}</h2>
        <img src={`https://pawmate-backend.onrender.com/${petInfo.cover}`} alt=""/>
      </div>
      <div className='pet-details'>
        <p className='owner'><strong>Owner:</strong>{petInfo.owner.username}</p>
        <p><strong>Age:</strong> {petInfo.age}</p>
        <p><strong>Gender:</strong> {petInfo.gender}</p>
        <p><strong>Breed:</strong> {petInfo.breed}</p>
        <p><strong>City:</strong> {petInfo.city}</p>
        <p><strong>Owner's Email:</strong> {petInfo.email}</p>
        {userInfo.id===petInfo.owner._id && (
            <Link to={`/edit/${petInfo._id}`}>
                <button className="edit">Edit Details</button>
            </Link>
        )}
        {userInfo.id === petInfo.owner._id && (
            <button onClick={Delete} className="delete" style={{ marginLeft: '20px' }}>
              Delete
            </button>
          )}
      </div>
    </div>
  )
}


export default PetPage
