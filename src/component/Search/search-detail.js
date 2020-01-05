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

    if(!item){
        return <div className="container">
            <div className="row">
                <span className="loading">Loading...</span>
            </div>
        </div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="content">
                    <h1 className="display-4">{item.name}</h1>
                    <p className="lead">Climate : {item.climate}</p>
                    <p className="lead">Terrain : {item.terrain}</p>
                    <p >Population : {item.population}</p>
                    <p><small>Created : {item.created}</small></p>
                    <p><small>Edited : {item.edited}</small></p>
                </div>
            </div>
        </div>
    );
}