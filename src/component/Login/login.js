import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login({authencatedUser}){

    const [username , setUsername] = useState('');
    const [passowrd , setPassword] = useState('');
    const [error , setError] = useState('');
    const [userList , setUserList] = useState([]);

    useEffect(()=>{
        getUserList();
    },[]);

    const getUserList = async() => {
        try {
            await axios.get('https://swapi.co/api/people/')
                .then(response => {
                    setUserList(response.data.results);
                });
        }
        catch(error){
            console.error('User service not working', error);
        }
    };

    const checkValidUser = () => {
        return userList.filter(item => username === item.name && passowrd === item.birth_year);
    }
    
    const authenticateUser = () => {
        console.log('userList',userList);
        const userExists = checkValidUser();

        if(!userExists || userExists.length === 0){
            setError('Please try with a Valid User');
        }
        console.log('userExists',userExists)
        if(userExists && userExists.length > 0){
            authencatedUser(username);
        }
        
    }

    return (
        <div className="container">
            <div className="row">                
                <div className="login">
                    {error && <span className="error">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input className="form-control" id="username" placeholder="User Name" 
                            onChange={(e)=>e.target.value && e.target.value.length > 4 && setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" 
                            onChange={(e)=>e.target.value && e.target.value.length > 4 && setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={authenticateUser} className="btn btn-primary">Submit</button>                
                </div>
            </div>
        </div>
    );
}