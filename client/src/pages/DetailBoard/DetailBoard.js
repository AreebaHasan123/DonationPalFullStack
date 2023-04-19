import 'src/pages/DetailBoard/DetailBoard.css'
import {  useParams } from "react-router-dom";
import React from "react"
import { useState, useEffect, useContext } from 'react';
import  { APIURLContext } from "src/contexts/APIURLContext"



function DetailBoard({match}) {

  //Get the APIURL from the context
    const APIURL=useContext(APIURLContext);

    const [product, setProduct]=useState({})

    const { _id }=useParams();

     useEffect(()=>{
      getProducts()
     }, [])

     const getProducts=()=>{
      
      fetch(`https://api-dot-arehasan-cit43600-donationpal.uc.r.appspot.com/api/v1/index/campaigns/_id?_id=${_id}`)
      //fetch(`http://localhost:8080/api/v1/index/campaigns/_id?_id=${_id}`)
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
  
 return(     
      <>
        <table >
          <thead>
          <tr>

          </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Goal: </th>
              <td>${product.goal}</td>
            </tr>
            <tr>
              <th scope="row">Description: </th>
              <td>{product.description}</td>
            </tr>
            <tr>
              <th scope="row">Start Date: </th>
              <td>{product.start_date}</td>
            </tr>
            <tr>
              <th scope="row">End Date: </th>
              <td>{product.end_date}</td>
            </tr>
            <tr>
              <th scope="row">Payment_ID </th>
              <td>{product.payment_id}</td>
            </tr>
            </tbody>
        </table> 
        <div>
            <form action={APIURL + '/index/create_checkout'} method='POST'>
              <input type='hidden' name='campaign_id' value={product._id}/>
              <input type='hidden' name='campaign_name' value={product.name}/>
              <input type='hidden' name='donation_amount' value='3000'/>

              <button class='button' type='submit'>
                Donate $30!
              </button>


            </form>
        </div>
        </>
  )}

  

export default DetailBoard;