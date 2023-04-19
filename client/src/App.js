import Header from './components/Header/Header';
import Board from './pages/Board/Board';

import DetailBoard from './pages/DetailBoard/DetailBoard';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import Campaign from './components/Campaign/Campaign';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfileDetail from './pages/ProfilePage/ProfileDetail';
import DonationsDetail from './pages/DonationsInfo/DonationsDetail';
import DonationSuccess from './pages/DonationSuccess/DonationSuccess';


function App() {
  return (
    <div className="App">

       <BrowserRouter>
        <Header />
        <Routes>   
        <Route path='/' element={<Board />} />      
          <Route path='/campaigns/:_id' element={<DetailBoard />} />
        
          <Route path='/users/:_id' element={<ProfileDetail />} />
          <Route path='/donations/:user_id' element={<DonationsDetail />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='/donation_success' element={<DonationSuccess />} />
        </Routes>
      </BrowserRouter>  

    
      
      

    </div>
  );
}

export default App;