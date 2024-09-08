import { Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { UserContextProvider } from './UserContext';
import CreatePet from './components/CreatePet';
import MyProfile from './components/MyProfile';
import PetPage from './components/PetPage';
import EditDetails from './components/EditDetails';
import Search from './components/Search';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>}/>
        <Route path='/SignIn' element={<SignIn />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/upload' element={<CreatePet/>}/>
        <Route path='/MyProfile' element={<MyProfile/>}/>
        <Route path='/upload/:id' element={<PetPage/>}/>
        <Route path='/edit/:id' element={<EditDetails/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
      </Route>
      </Routes>
    </UserContextProvider> 
  );
}

export default App;
