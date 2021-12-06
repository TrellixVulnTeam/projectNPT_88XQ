import React, { ReactElement, useState } from 'react';
import {LoginStyled} from './styled/LoginStyled'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
interface Props {}

function Login({}: Props): ReactElement {

    const [token, setToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4ODUwNzc3LCJpYXQiOjE2Mzg3NjQzNzcsImp0aSI6IjAxNTYxZTQwMTE3ZTQyODE4Njc3YWVlN2MzMmIwYjRhIiwidXNlcl9pZCI6M30.7il-v5nyi-4tqbrQOy7DSz7d4_K9bPfQfesZjfKsC1c')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const checkLogin =() =>{
        axios.post('http://127.0.0.1:8000/api/token/',{
            username: user,
            password: pass,
            
        }).then(response =>{
            const myToken = response.data;
            setToken(myToken.access)
        })
    }

    console.log(token);
    
    return (
        <LoginStyled className="login">
            <form action="" className="login__form">
                <h1 className="login__form__title">Login form</h1>
                <label htmlFor="" className="login__form__label">Username</label>
                <input type="text" id="username" className="login__form__textbox" value={user} onChange={e => setUser(e.target.value) }/>
                <br />
                <label htmlFor="" className="login__form__label">Password</label>
                <input type="password" id="password" className="login__form__textbox" value={pass} onChange={e => setPass(e.target.value) }/>
                <br />
                <Link to ="/" state={{user,token}}>
                    <button  className ="login__form__button" onClick ={()=>{checkLogin()}}>Login</button>
                </Link>
                
                               
            </form>
            {/* <ul>
                {posts.map(post =>(
                    <li key = {post.id}>{post.title}</li>
                ))}
            </ul> */}
        </LoginStyled>
    );
}

export default Login;