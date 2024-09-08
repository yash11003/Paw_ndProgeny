import {useState,useContext} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../UserContext";
import './Sign.css';


function SignIn() {
  const nav = useNavigate()
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {setUserInfo} = useContext(UserContext);

  async function Signin(ev){
    ev.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "username": username,
        "password": password
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      const response = await fetch('https://pawmate-backend.onrender.com/SignIn', requestOptions);
      const res = await response.json()
      console.log(res)
      if(res.token){
        localStorage.setItem("token",res.token)
        nav('/')
        setUserInfo(res);
      }else{
        alert(res)
      }

    } catch (error) {
      console.log(error);
      
    }
  
  }


  return (
    <div className="container">
      <div className="image-section">
        <img src={require('./dog.jpg')} alt="Dog.jpg"/>
      </div>
      <div className="form-section">
        <form className="Sign" onSubmit={Signin}>
        <h1>Sign In</h1>
        <input type="text" 
        placeholder="username"
        value={username}
        onChange={ev=>setUsername(ev.target.value)} required/>
        <input type="password" 
        placeholder="password"
        value={password}
        onChange={ev=>setPassword(ev.target.value)} required/>
        <button>SignIn</button>
    </form>
      </div>
    </div>
  );
}

export default SignIn
