import React from 'react';
import logo from'../../static/images/xebia.png';

export default function Header() {  
  return (
            <header className="container app-header">
                <div className="row">
                    <img src={logo} className="logo"  alt="logo" /> 
                    <span>Planets</span>
                </div>
            </header>
        );
}