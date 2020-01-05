import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import HomePlanets from '../HomePlanets/home-planets';
import Search from '../Search/search';
import SearchDetail from '../Search/search-detail';


export default function RoutingContainer({authencatedUser}) {
    const logoutUser = () => {
        authencatedUser('');
        window.location.pathname='/';
    }
    const username = sessionStorage.getItem('logged in');
    return (

        <div className="main-container">
            <button className="logout" onClick={logoutUser}><strong>{username}</strong> Logout</button>
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <ul className="navbar navbar-dark bg-dark justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <Route exact path="/" component={HomePlanets} />
                <Route exact path="/search" component={Search} />
                <Route path="/search/:name" component={SearchDetail}/>
            </Router>
        </div>

    );
  }
  