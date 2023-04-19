import { useNavigate,  useParams } from 'react-router-dom';
import React from "react"
import { useState, useEffect } from 'react';

function DonationsDetail({match}) {

    
    const[donation, setDonation]=useState({})

    const { user_id }=useParams();
    
    const navigate = useNavigate(); 

    useEffect(()=>{
     
        getDonations()
       }, [])
  
       const getDonations=()=>{
        //fetch(`http://localhost:8080/api/v1/index/donations/user_id?user_id=${user_id}`)
        fetch(`https://api-dot-arehasan-cit43600-donationpal.uc.r.appspot.com/api/v1/index/donations/user_id?user_id=${user_id}`)
        .then(res=>{
          if(res.ok){
            return res.json()
          }else{
            console.log('res error')
          }
        })
        .then((data)=>{
          setDonation(data)
          
         })
        .catch((err)=>console.log(err))
      
   
       };

       const handleLogOut=(event)=>{
        event.preventDefault();
        localStorage.removeItem("accessToken");
        navigate('/');

    }
   
    
 return(     
      <>
      <h1>Your Donation Info</h1>
        <table >
          <thead>
          <tr>
          </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">User Id </th>
              <td>${donation.user_id}</td>
            </tr>
            <tr>
              <th scope="row">Your Message </th>
              <td>${donation.message}</td>
            </tr>
            <tr>
              <th scope="row">Your Amount </th>
              <td>${donation.amount}</td>
            </tr>
            <tr>
              <th scope="row">Your Date of Donation </th>
              <td>${donation.date}</td>
            </tr>
            </tbody>
        </table>  
        <form>
            <input type="submit" onClick={handleLogOut} value="LogOut" />
            </form>
        </>
  )}

  

export default DonationsDetail;