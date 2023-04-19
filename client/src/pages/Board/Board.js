import 'src/pages/Board/Board.css';
import { useParams } from "react-router-dom";
import { Link as RouterLink , link as Link, Outlet, Routes, Route} from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from 'src/pages/Board/2.png';

function Board() {

    const [campaigns, setCampaigns] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

     useEffect(() => {
        // Define a function that loads campaigns from the API
        const loadTasks = async () => {

            try {

                //const response = await axios.get(`http://localhost:8080/api/v1/index/campaigns`);
                const response = await axios.get(`https://api-dot-arehasan-cit43600-donationpal.uc.r.appspot.com/api/v1/index/campaigns`);
                //console.log(response.data);
                setCampaigns( (campaigns) => [...response.data]);
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
    }, []); 

    return(
        
        <div>
            <div className='row'>
                {campaigns.map((campaign)=>{
                    const{_id, name}=campaign
                    return(
                        <>
                        <div key={_id} className="cards">
                            <div className="card">
                                <img className="card__image" src={logo} alt=""/>
                                <div className="card__content">
                                    <p>
                                        {name}
                                    </p>
                                    <p>
                                       Id: {_id}
                                    </p>
                                </div>
                             <div className="card__info">
                                
                                <div>
                              {/*<RouterLink to={`/campaigns/${_id}`} className="card_link">  */}
                                
                               
                                <RouterLink to={`https://arehasan-cit43600-donationpal.uc.r.appspot.com/campaigns/${_id}`} className="card_link"> 
                                     Details!
                                </RouterLink>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                    </>

   

            )}
                
        )}   
    </div>         
                
</div>
            
        
    )
}

export default Board;