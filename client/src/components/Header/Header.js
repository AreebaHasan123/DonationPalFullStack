import { Link as RouterLink } from 'react-router-dom';
import Campaign from '../Campaign/Campaign';
import {Link, Outlet} from 'react-router-dom'
import 'src/components/Header/Header.css';

function Header() {
    return (
        <>
            <header>
                <h1>Donation Pal</h1>
             <nav>             
                <RouterLink to='/' className="Header-link">
                    Home Page
                </RouterLink>
                <div>
                <ul>
                <div className='login-link'>
                 <li class="a"><Link to='/login'>Login</Link></li>
                 </div>
                  
                </ul>
                </div>

            </nav>
            <Outlet />
            </header>
        </>
    )
}

export default Header;