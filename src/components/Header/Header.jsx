import React from 'react'
import './Header.scss';

function Header() {
  return (
    <div className="header-container">
        <div className='name-container'>Sreehari V</div>
        <div className='menu-container'>
            <div className="menu-item">Home</div>
            <div className="menu-item">About</div>
            <div className="menu-item">Projects</div>
            <div className="menu-item">Contact</div>  
        </div>
    </div>
  )
}

export default Header