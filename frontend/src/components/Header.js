import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext} from 'react';
import { UserContext } from '../UserContext';
import './Header.css';

function Header() {

  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://pawmate-backend.onrender.com/profile', {
      headers:{ 
        "Authorization":"Bearer "+localStorage.getItem("token")
    },
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  async function Signout() {
    try {
      const response = await fetch('https://pawmate-backend.onrender.com/SignOut', {
        headers:{ 
          "Authorization":"Bearer "+localStorage.getItem("token")
      },
        method: 'POST',
      });

      if (response.ok) {
        setUserInfo(null); 
        navigate('/SignIn'); 
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <img src={require('./PawMate.jpg')} alt="PawMate.jpg"/>
        <span>PawMate</span>
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/MyProfile">MyPets</Link>
            <Link to="/Search">Search</Link>
            <Link to="/upload">AddPet</Link>
            <Link to="/AboutUs">About Us</Link>
            <button onClick={Signout}>SignOut</button>
          </>
        ) : (
          <>
            <Link to="/SignIn">SignIn</Link>
            <Link to="/SignUp">SignUp</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
