import React, { ReactElement, useState } from 'react';
import {LoginStyled} from './styled/LoginStyled'
import {useEffect} from 'react'
interface Props {}

function Login({}: Props): ReactElement {

    const [title,setTitle] = useState('')

    // const [posts, setPosts] = useState<any[]>([])

    // useEffect(()=>{
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(res => res.json())
    //         .then(posts => {
    //             setPosts(posts);
    //         })
    // },[])

    return (
        <LoginStyled className="login">
            <form action="" className="login__form">
                <h1 className="login__form__title">Login form</h1>
                <label htmlFor="" className="login__form__label">Username</label>
                <input type="text" id="username" className="login__form__textbox" value={title} onChange={e => setTitle(e.target.value) }/>
                <br />
                <label htmlFor="" className="login__form__label">Password</label>
                <input type="password" id="password" className="login__form__textbox"/>
                <br />
                <button  className ="login__form__button">Login</button>
                <button  className ="login__form__button">Register</button>               
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