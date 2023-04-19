import 'src/components/Campaign/Campaign.css';
import { Link as RouterLink , Routes, Route} from 'react-router-dom';
import Detail from '../Detail/Detail';

function Campaign( { _id, name,}) {
    return (
        <div className='Campaign-wrapper'>
            
            <h3>{name}</h3>
        </div>
    )
}
export default Campaign