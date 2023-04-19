import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { APIURLContext } from "src/contexts/APIURLContext";
import useToken from "src/hooks/useToken";
import useInfo from "src/hooks/useInfo";
import axios from 'axios';


export default function LoginForm(){
    const { _id }=useParams();
    const [inputs, setInputs]=useState({});
    const [users, setUsers] = useState([]); 
    const [donations, setDonations] = useState({}); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const apiURL=useContext(APIURLContext)
   const {token, setToken}=useToken();
   //const {email, setEmail}=useInfo();
   const navigate = useNavigate();

    

      useEffect(() => {
        // Define a function that loads campaigns from the API
        const loadTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/index/users`);
                //console.log(response.data);
                setUsers( (users) => [...response.data]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
                console.error(err);
            }
        };
        const loadDonations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/index/donations`);
                console.log(response.data);
                setDonations( (donations) => [...response.data]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
                console.error(err);
            }
        };

        // Call the function we defined
        setLoading(true);
        loadTasks();
        loadDonations();
    }, []); 





/* 
   if(token){
    return <Navigate replace to='/profile' />
   } */

 
    //console.log(`My api url is: ${apiURL}`)


    //function that posts form data to API
    async function loginUser(credentials){
        try{
            let res=await axios.post(apiURL+ '/index/login', credentials);
            console.log(res.data);
            return res.data;
        }catch(err){
            console.log(err);
            return null;
        }
    }


    
   
    //Handler function for form field changes
    const handleChange=(event)=>{
        const fieldName=event.target.name;
        const fieldValue=event.target.value;
        setInputs(values=>({...values, [fieldName]: fieldValue}));
    }

    const handleLogOut=(event)=>{
        event.preventDefault();
        localStorage.removeItem("accessToken");
        navigate('/');

    }

    //Handler function for the login form
    const handleSubmit= async(event)=>{
        event.preventDefault();
        //alert(`You entered ${inputs.email} and ${inputs.password}`);
       
        let loginCredentials={};
        let data={};
        let donationData={};
        
        loginCredentials.email=inputs.email;
        
        
        loginCredentials.password=inputs.password;
        console.log(`Login Credentials`);
        console.log(loginCredentials);
        
        const loginResponse=await loginUser(loginCredentials);
        console.log(`Login response`);
        console.log(loginResponse);
        donationData.user_id=loginResponse._id

        if(loginResponse== null){
            alert(`That username and password do not exist`)
        }else{
            //alert(`Your access token is: ${loginResponse.accessToken}`)
            setToken(loginResponse.accessToken);
            //setEmail(loginResponse.email)
            console.log('userID');
            console.log(donationData.user_id)
            
            navigate(`/users/${loginResponse._id}`)
            
            
            
        }

    }
    return(
        //Login form goes here
        <div className="Auth-form-container">
            

        <form method="post" onSubmit={handleSubmit}>
            <div className="Auth-form-container">
            <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">   
            <label> Input your email address
                <input type="text"
                value={inputs.email || ""}
                name="email"
                onChange={handleChange}

                />
            </label><br />
            </div>
            <div className="form-group mt-3">
            <label> Input your password
                <input type="password" 
                value={inputs.password || ""}
                name="password"
                onChange={handleChange}

                />
            </label><br />
            </div>
            <div className="d-grid gap-2 mt-3">
            <input type="submit" value="Login" />
            
            </div>
            
            </div>
        </form>
        </div>
    )
}