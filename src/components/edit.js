import React, {useEffect, useState } from 'react';
import axiosInstance from "../axios";
import {useParams, useHistory} from 'react-router-dom'



const Edit = () =>{

    const content ={
        wordWrap: 'break-word',
        
    }

    const { id } = useParams();
    const [post, setPost] = useState();
    
    

    const history = useHistory();
    const initialFormData = Object.freeze({
        title: post?.title,
        content: post?.content,
        category: post?.category,
        public: "",
    })
    const [data, setData] = useState(initialFormData);
    const changeData = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value.trim(),

        })
    }
    console.log(data)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('category', data.category);
        formData.append('public', data.public);
        axiosInstance
            .put(`/blogupdate/` + post.id, formData)
            .then((res) => {
                history.push('/');
                console.log(res);
                console.log(res.data);
            })
    }

    


    useEffect(() =>{
        axiosInstance.get('/' + id +'/')
        .then(response => {
            console.log(response.data);
            const mypost = response.data;
            setPost(mypost);
            // console.log(mypostresult);
        })
    }, [])


    return(
        <div className='row'>
            <form >
                <div className='input-field col s12'>
                    <input
                        placeholder="title" id='title' type="text" name="title" defaultValue={post?.title} 
                        onChange={changeData}
                        >
                            
                        </input>
                </div>
                <div className='input-field col s12'>
                    <input
                        placeholder="content" id='content'type="text" name="content" style={content} defaultValue={post?.content}
                        onChange={changeData}
                        >

                        </input>
                </div>
                <div className='input-field col s12'>
                    <div>
                        <label> Public</label>
                    </div>
                    <select className="browser-default" name="public" onChange={changeData} >
                        <option value="" disabled selected>Choose Publich</option>  
                        <option value='1'>Yes</option>
                        <option value="0">No</option>

                        {/* <option value="ECC(256)">ECC(256)</option>
                            <option value="ECC(512)">ECC(512)</option> */}
                    </select>
                </div>
                <div class="input-field col s12">
                    <div>
                        <label>Category Select</label>
                    </div>
                    <div>
                        <input className="browser-default" name="category" Value={post?.category} >
                            {/* <option value="" disabled inputed>Choose category</option>
                            <option value="python">python</option>
                            <option value="reactjs">reactjs</option>
                            <option value="html/css">html/css</option> */}
                            {/* <option value="ECC(256)">ECC(256)</option>
                            <option value="ECC(512)">ECC(512)</option> */}
                        </input>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action"  onClick={handleSubmit}>
                    Submit
                </button>

            </form>
        </div>
    )
}
export default Edit