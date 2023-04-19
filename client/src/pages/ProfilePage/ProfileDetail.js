import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import React from "react"
import { useState, useEffect } from 'react';



function ProfileDetail({match}) {

    const [product, setProduct]=useState({})
  

    const { _id }=useParams();
    const { user_id }=useParams();
    
    const navigate = useNavigate(); 

     useEffect(()=>{
      getProducts()
   
      
     }, [])

   

     const getProducts=()=>{
      fetch(`https://api-dot-arehasan-cit43600-donationpal.uc.r.appspot.com/api/v1/index/users/_id?_id=${_id}`)
      //fetch(`http://localhost:8080/api/v1/index/users/_id?_id=${_id}`)
      .then(res=>{
        if(res.ok){
          return res.json()
        }else{
          console.log('res error')
        }
      })
      .then((data)=>{
        setProduct(data)
        
       })
      .catch((err)=>console.log(err))
    
 
     };


    


     const handleLogOut=(event)=>{
        event.preventDefault();
        localStorage.removeItem("accessToken");
        navigate('/');

    }
    const handleDetails=(event)=>{
      event.preventDefault();
      navigate(`/donations/${_id}`);

  }

   
   
    
 return(     
      <>
       <h1>My Profile</h1>
     
       
        <table >
          <thead>
          <tr>
          </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Your Email </th>
              <td>{product.email}</td>
            </tr>
            <tr>
              <th scope="row">Your Phone Num </th>
              <td>{product.phone}</td>
            </tr>
            <tr>
              <th scope="row">Your Gender </th>
              <td>{product.gender}</td>
            </tr>
            
            </tbody>
        </table>  
        <form>
            <input type="submit" onClick={handleLogOut} value="LogOut" />
            <input type="submit" onClick={handleDetails} value="Donation Details" />
            
            </form>
            
        
        </>
  )}

  

export default ProfileDetail;