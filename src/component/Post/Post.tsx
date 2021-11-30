/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useEffect, useState } from 'react';
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

    return (
        <PostStyled >

            {posts.map(post => (
                <div className="post">
                    <a href="" className="a">
                        <h1 className = "post__title">{post.title}</h1>
                    </a>
                    <a href="" className="a"> 
                        <span className="post__category">Category</span>
                    </a>
                    <span className="post__date"> Ngày buồn tháng nhớ năm thương </span>
                    <p className="post__content">{post.body}</p>
                </div>
            ))}


        </PostStyled>
    );
}

export default Post;