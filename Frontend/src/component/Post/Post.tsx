/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type } from 'os';
import React, { ReactElement, useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import Header from '../Header/Header';
import PostPage from '../PostPage/index';
import {PostStyled} from './styled/PostStyled';
interface Props {}

function Post({}: Props): ReactElement {

    const [posts, setPosts] = useState<any[]>([]);

    
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res=> res.json())
            .then(posts => {
                setPosts( posts );
            })
    },[])

    const[postid, setPostid] = useState(1);
    const[userid, setUserid] = useState(1);
    const[title, setTitle] = useState("sadasd");
    const[body, setBody] = useState("aaaaaaaaaaaaaa");
    
    // const myObj = JSON.parse();
    
    
    return (
        
        <PostStyled >
            <div className="post"  >
            {posts.map(post => (
                
                <Link onClick={() => setPostid(post.id + 1)} 

                state={{postid,userid,title,body}}

                to="/postpage" key={post.id + 1} className="a"> 
                        <h1  className = "post__userID">{post.userId}</h1>
                    
                        <h1 className = "post__title">{post.title}</h1>

                        <span className="post__category">Category</span>

                        <span className="post__date"> Ngày buồn tháng nhớ năm thương </span>

                        <p>{postid}</p>
                        <p className="post__content">{post.body}</p>
                </Link>
            ))}
            </div>
        </PostStyled>
    );
}

export default Post;