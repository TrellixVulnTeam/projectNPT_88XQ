
import React, { ReactElement, useEffect, useState } from 'react';
import {Link, useNavigate  } from 'react-router-dom';
// import Header from '../Header/Header';
// import PostPage from '../PostPage/index';
import {PostStyled} from './styled/PostStyled';
import axios from 'axios';
import { connect } from "react-redux";

interface Props {}

function Post({}: Props): ReactElement {

    const [posts, setPosts] = useState<any[]>([]);

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4NTg1MDM0LCJpYXQiOjE2Mzg0OTg2MzQsImp0aSI6IjA2MDQwYWU4NzkzMTRlYzhiYjNjYTE5ODBkZDUwZThmIiwidXNlcl9pZCI6M30._DECu0Y7zR8fnuaBzNiQjAs5BzBj5xHbuOxm7NBPiwE"
    
    const[postid, setPostid] = useState(2);
   


    
    
    // console.log('Bearer ' + token);
    
    

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/`,{
            responseType: 'json',
        })
        .then(response => {
            // console.log(response.data);
            const myposts = response.data;
            setPosts(myposts.results);
            // console.log(mypostresult);
        })

        
    },[])

    
    console.log(posts);
    
    console.log(postid);
    

    
    
    // const myObj = JSON.parse();
    
    
    return (
        
        <PostStyled >
            <div>
                <button className="btnADD">ADD Blog</button>
            </div>
            <div className="post"  >

            {posts.map(post => (
                
                
                <Link key={post.id} state = {{postid : post.id}}

                to="/postpage"  className="a" > 
                        <h1  className = "post__userID">{post.user}</h1>
                    
                        <h1 className = "post__title">{post.title}</h1>

                        <span className="post__category">{post.category}</span>

                        <span className="post__date"> {post.updated_at} </span>
                        <p className="post__content">{post.content}</p>
                </Link>
                
            ))}
            </div>
        </PostStyled>
    );
}


export default Post;