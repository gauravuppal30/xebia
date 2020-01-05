import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePlanets() {

    const [homePlanets, setHomePlanets] = useState([]);

    useEffect(()=>{
        fetchPlanets();
    },[]);

    const fetchPlanets = async() => {
        try {
            await axios.get('https://swapi.co/api/planets/').then(response => setHomePlanets(response.data.results));
        }
        catch(error){
            console.error('Planet service not working', error);
        }
    };

    const renderPlanets = () => homePlanets && homePlanets.map((item, index) => {
        return (<div className="col-4" key={index}>
            <div className="card">
                <div className="card-img-overlay">
                    <p className="card-text">Gravity : {item.gravity}</p>
                    <p className="card-text">Population : {item.population}</p>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Climate : {item.climate}</p>
                    <p className="card-text">Terrain : {item.terrain}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Created : {item.created}</small><br/>
                    <small className="text-muted">Edited : {item.edited}</small>
                </div>
            </div>
        </div>)
    });

    return (
        <div className="container app-planets">
            <div className="row">{renderPlanets()}</div>
        </div>
      );
}
