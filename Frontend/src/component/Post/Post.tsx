
import React, { ReactElement, useEffect, useState } from 'react';
import {Link, useNavigate ,useLocation } from 'react-router-dom';
// import Header from '../Header/Header';
// import PostPage from '../PostPage/index';
import {PostStyled} from './styled/PostStyled';
import axios from 'axios';


interface Props {}

function Post({}: Props): ReactElement {


    const [posts, setPosts] = useState<any[]>([]);

    

    // console.log('Bearer ' + token);
    const location = useLocation() 
    // const [id , setId] = useState(1)
    const {token} = location.state
    console.log(token);
    

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/`,{
            headers:{
                'Authorization': 'Bearer ' + token
            },
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
    
    // console.log(postid);
    
    
    
    
    // const myObj = JSON.parse();
    
    
    return (
        
        <PostStyled >
            <div>
                <Link to ="/add">
                    <button className="btnADD">ADD Blog</button>
                </Link>
            </div>
            <div className="posts"  >

            {posts.map(post => (
                
                
                <Link key={post.id} state = {{postid : post.id}}

                to="/postpage"  className="post a " > 
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