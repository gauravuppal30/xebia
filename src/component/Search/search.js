import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import planetPlaceholder from'../../static/images/planet.png';

import axios from 'axios';

export default function Search() {

    const [ resultSet , setResultSet] = useState([]);
    const [ searchKey , setSearchKey] = useState('');
    const [ searchLimit , setSearchLimit] = useState('');
    const [ searchDirty , setSearchDirty] = useState(false);
    const [ loading , setLoading] = useState(false);
    const [ searchCount , setSearchCount] = useState(parseInt(sessionStorage.getItem('searchCount'))||0);

    useEffect(()=>{
        //searchResults('');
        if(searchCount > 15 && sessionStorage.getItem('logged in') !== 'Luke Skywalker'){
            setSearchLimit('You have exceed the limit')
        }
    },[searchCount]);

    const searchResults = async(query) => {
        setLoading(false);
        try {
            await axios.get(`https://swapi.co/api/planets/?search=${query}`)
                .then(response => {
                    query && setSearchCount(searchCount + 1);
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
        const input = e.target.value && e.target.value.trim();
        setSearchKey(input);
        setSearchDirty(true);

        if(input && input.length > 2){
            setTimeout(()=>{
                !searchLimit && searchResults(input);
            },250);
        }
    }

    const clearInput = () => {
        searchKey && setSearchDirty(false) && setResultSet([]);
        searchKey && setSearchKey('');
    }

    const setLink = (link) => {
        console.log('link',link)
        sessionStorage.setItem('detail',link)
    }

    const renderSearchResults = () => {
        if(!searchDirty){
            return <span className="loading">Please start your search</span>
        }
        if(!loading){
            return <span className="loading">Loading...</span>
        }
        if(resultSet && resultSet.length === 0){
            
            return <span className="loading">No Result Found</span>
        }
        sessionStorage.setItem('searchCount', searchCount);

        return resultSet.map((item, index)=>{
            let classValue = 'col-4';
            if(item.population === "unknown"){
                classValue = 'col-6';
            } else if(item.population < "100000"){
                classValue = 'col-3';
            }
            return(
                <div className={classValue} key={index}>
                    <Link onClick={()=>setLink(item.url)} to={"/search/"+item.name}>
                        <div className="card">
                            <img src={planetPlaceholder} alt="placeholder" />
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
                    <div className="page-heading">
                        <h1 className="display-4">Planets Search</h1>
                        <small>Search Count : {searchCount}</small>
                    </div>
                    <div className="search-box">
                        <input className="form-control" value={searchKey} placeholder="Start Searching Here..." onChange={searchInput}/>
                        <button className="clear" onClick={clearInput}>X</button>
                        <small className="error">{searchLimit}</small>
                    </div>
                    <div className="search-result">
                        {resultSet && renderSearchResults()}
                    </div>
                </div>
            </div>
        );
}