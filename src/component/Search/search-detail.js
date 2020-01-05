import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchDetail(){
    const responseUrl = sessionStorage.getItem('detail');
    const [item, setItem]= useState('');
    const searchResults = async() => {
        try {
            await axios.get(responseUrl)
                .then(response => setItem(response.data));
        }
        catch(error){
            console.error('search details service not working', error);
        }
    };

    useEffect(()=>{
        if(responseUrl){
            searchResults();
        }
    },[]);

    return (
        <div className="container">
            <div className="row">
                <div className="content">
                    <h1 className="display-4">{item && item.name}</h1>
                    <p className="lead">Climate : {item && item.climate}</p>
                    <p className="lead">Terrain : {item && item.terrain}</p>
                    <p >Population : {item && item.population}</p>
                    <p><small>Created : {item && item.created}</small></p>
                    <p><small>Edited : {item && item.edited}</small></p>
                </div>
            </div>
        </div>
    );
}