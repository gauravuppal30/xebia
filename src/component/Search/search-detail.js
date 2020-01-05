import React from 'react';

export default function SearchDetail({item}){
    return (
        <div className="container">
            <div className="row">
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
            </div>
        </div>
    );
}