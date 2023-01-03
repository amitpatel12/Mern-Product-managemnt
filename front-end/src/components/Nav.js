import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const Nav = () =>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/signup')
    }
    return (
        <div className='container'>
            <img
            src='https://64.media.tumblr.com/6c20f5206af7ad37541b8ae0e74e232c/tumblr_pwmv0bjG2U1vewxszo1_1280.jpg'
            alt='logo'
            className='logo'
            />
            {
                auth ? <ul className='nav-ul'>
                    <li><Link to='/'>Products</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/update'>Update Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Log In</Link></li>
                </ul>

            }
        </div>
    )
}

export default Nav;