import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import useAuth from '../../components/Login/useAuth';


const Header = () => {
    const auth = useAuth();


    return (
        <div className='header'>
            <a href="/"><img src={logo} alt=""/> </a>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user && <span style={{color: 'white'}}>Welcome {auth.user.name}!</span>
}
                {
                    auth.user ? <a href="/login">Sign Out</a>
                    : <a href="/login">Sign In</a>
                }
            </nav>
        </div>
    );
};

export default Header;