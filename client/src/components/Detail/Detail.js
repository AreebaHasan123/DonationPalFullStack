import { useParams } from 'react-router-dom';
import 'src/components/Detail/Detail.css';
import Campaign from '../Campaign/Campaign';

function Detail( { _id, description, goal, start_date, end_date}) {
    
 
    return (
        <div className='Details-wrapper'>
            <h3>{description}</h3>
            <p>{goal}</p>
            <p>{start_date}</p>
            <p>{end_date}</p>
            
            
        </div>
    )
}

export default Detail;