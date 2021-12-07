import axiosInstance from "../axios";
import {useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
const PostPage = () =>{
    
    const { id } = useParams();
    const [post, setPost] = useState();
    const postpage ={
        backgroundColor:"aliceblue",
        margin:'20px 150px',
        marginBottom: '50px',
        padding: '20px 40px',
        borderRadius:'5px',
    }

    const postpage__content ={
        wordWrap: 'break-word',
    }
    const a ={
        TextDecoder:'none',
        // color : 'white',
        // float: 'right',
        
    }
    const btn ={
        backgroundColor:'darksalmon',
        padding:'20px 40px',
        float: 'right',
        marginTop: '50px',
        border:'0px solid',
        color : 'white',
        borderRadius: '2px',
    }
    useEffect(() =>{
        axiosInstance.get('/' + id +'/')
        .then(response => {
            console.log(response.data);
            const mypost = response.data;
            setPost(mypost);
            // console.log(mypostresult);
        })
    },[])

    return(
        <div className="postpage" style = {postpage}>

            <h1 className = "postpage__title">{post?.title}</h1>
            <small>{post?.category}   By {post?.user} published at {post?.updated_at}</small>
            <p className="postpage__content" style = {postpage__content}>{post?.content}</p>

            <div>
                <Link to = {'/edit/' + post?.id} style ={a} >
                    <button style = {btn}>
                        
                        Edit
                        
                    </button>
                </Link>
            </div>
        </div>
        
    );
    
}

export default PostPage;