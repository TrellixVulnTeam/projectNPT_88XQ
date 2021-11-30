/* eslint-disable jsx-a11y/anchor-is-valid */
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

    // const[show, setShow] = useState(false);

    return (
        
        <PostStyled >
           
            {posts.map(post => (
                <div className="post">
                    
                    <Link to="/postpage" className="a">
                        <h1 className = "post__userID">{post.userId}</h1>
                    
                        <h1 className = "post__title">{post.title}</h1>

                        <span className="post__category">Category</span>
                    </Link>
                    
                    
                    <span className="post__date"> Ngày buồn tháng nhớ năm thương </span>
                    <p className="post__content">{post.body}</p>
                    {/* {show && <PostPage />} */}
                </div>
                
            ))}


        </PostStyled>
    );
}

export default Post;