import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import axios from 'axios';

export default function Search() {

    const [ resultSet , setResultSet] = useState([]);
    const [ searchKey , setSearchKey] = useState('');
    const [ searchDirty , setSearchDirty] = useState(false);
    const [ loading , setLoading] = useState(false);

    useEffect(()=>{
        searchResults('');
    },[]);

    const searchResults = async(query) => {
        setLoading(false);
        try {
            await axios.get('https://swapi.co/api/planets/?search='+ query)
                .then(response => {
                    setResultSet(response.data.results);
                    setSearchDirty(true);
                    setLoading(true);
                });
        }
        catch(error){
            console.error('search service not working', error);
        }
    };

    const searchInput = e => {
        setSearchKey(e.target.value && e.target.value.trim());
        setSearchDirty(true);
        console.log(searchKey && searchKey.length)
        if(searchKey && searchKey.length > 2){
            searchResults(searchKey);
        }
    }

    const clearInput = () => {
        searchKey && setSearchDirty(false) && setResultSet([]);
        searchKey && setSearchKey('');
    }

    const renderSearchResults = () => {
        if(!searchDirty){
            return <span>Please start your search</span>
        }
        if(!loading){
            return <span>Loading...</span>
        }
        if(resultSet && resultSet.length === 0){
            
            return <span>No Result Found</span>
        }
        return resultSet.map((item, index)=>{
            let classValue = 'col-4';
            if(item.population === "unknown"){
                classValue = 'col-6';
            } else if(item.population < "100000"){
                classValue = 'col-3';
            }
            return(
                <div className={classValue} key={index}>
                    <Link onClick={sessionStorage.setItem('detail',item.url)} to={"/search/"+item.name}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Climate : {item.climate}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Created : {item.created}</small>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
    }

    return (
            <div className="container app-search">
                <div className="row">
                    <div className="search-box">
                        <input className="form-control" value={searchKey} placeholder="Start Searching Here..." onChange={searchInput}/>
                        <button className="clear" onClick={clearInput}>X</button>
                    </div>
                    <div className="search-result">
                        {resultSet && renderSearchResults()}
                    </div>
                </div>
            </div>
        );
}