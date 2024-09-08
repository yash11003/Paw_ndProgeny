import { useState } from "react";
import { Navigate } from "react-router-dom";
import './Sign.css';

function SignUp() {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [redirect,setRedirect] = useState(false);
    async function signup(ev){
        ev.preventDefault();
        const response=await fetch('https://pawmate-backend.onrender.com/SignUp',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},

        });
        if(response.status===200){
            alert('registration successful');
            setRedirect(true);
        }
        else
            alert('registration failed');
    }
    if(redirect){
        return<Navigate to={'/SignIn'}/>
    }
      
    return (
        <div className="container">
          <div className="image-section">
            <img src={require('./dog.jpg')} alt="Dog.jpg"/>
          </div>
          <div className="form-section">
            <form className="Sign" onSubmit={signup}>
            <h1>Sign Up</h1>
            <input type="text" 
                placeholder="username"
                value={username}
                onChange={ev=>setUsername(ev.target.value)} required/>
            <input type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)} required/>
            <button>SignUp</button>
        </form>
          </div>
        </div>
      );
}

export default SignUp
