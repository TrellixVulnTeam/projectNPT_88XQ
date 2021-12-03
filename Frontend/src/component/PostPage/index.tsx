import React, { ReactElement, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {PostPageStyled} from './styled/PostPageStyled'
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import Post from '../Post/Post';
interface Props {}

function PostPage({}: Props): ReactElement {

    type Post = {
        category: string,
        content: string,
        id: number,
        title: string,
        updated_at:string,
        user:string,

    }
    const location = useLocation() 
    // const [id , setId] = useState(1)
    const {postid} = location.state
    const [post, setPost] = useState<Post>();

    console.log(postid);
    


    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/` + postid,{
            responseType: 'json',
        })
        .then(response => {
            console.log(response.data);
            const mypost = response.data;
            setPost(mypost);
            // console.log(mypostresult);
        })

        
    },[])

    console.log(post?.user);
    

    return(
        <PostPageStyled>
            
            <div className="postpage">
                <h1 className = "postpage__userID">{post?.user}</h1>
            
                <h1 className = "postpage__title">{post?.title}</h1>
                
                <span className="postpage__category">{post?.category}</span>
                
                <span className="postpage__date">{post?.updated_at}</span>
                <p className="postpage__content">{post?.content}</p>
        </div>
        </PostPageStyled>
    );
}

export default PostPage;
