/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { AddBlogStyled } from './styled/AddBlogStyled'
interface Props {}

function AddBlog({}: Props): ReactElement {

    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('Dropdown')
    const [content,setContent] = useState('')
    const [puBlic,setPuBlic] = useState(1)

    const AddPost =() =>{
        axios.post('http://127.0.0.1:8000/api/creteblog',{
            
            
        }).then(response =>{
            
        })
    }

    return(
        <AddBlogStyled>
            <div className="formAdd">
                <form action="">
                    <h1>Add Blog</h1>
                    <label htmlFor="" className ="formAdd__label">Title</label>
                    <input type="text" id="title" className="formAdd__title" value={title} onChange={e => setTitle(e.target.value) }/>
                    <br />
                    <label htmlFor="" className ="formAdd__label">Category</label>
                    <div className="dropdown">
                        <button className="dropdown__btn">{category}</button>
                        <div className="dropdown__content">
                            <a  className="dropdown__a" onClick={() => {setCategory('War')}}>War</a>
                            <a  className="dropdown__a" onClick={() => {setCategory('Animal')}}>Animal</a>
                            <a  className="dropdown__a" onClick={() => {setCategory('Trade')}}>Trade</a>
                        </div>
                    </div>
                    <br />
                    <label htmlFor="" className ="formAdd__label" >Content</label>
                    <input type="text" id="content" className="formAdd__content" value={content} onChange={e => setContent(e.target.value) }/>
                    <br />
                    <label htmlFor="" className ="formAdd__label">Public</label>
                    <div className="dropdown">
                        <button className="dropdown__btn">{puBlic}</button>
                        <div className="dropdown__content">
                            <a  className="dropdown__a" onClick={() => {setPuBlic(0)}}>Private</a>
                            <a  className="dropdown__a" onClick={() => {setPuBlic(1)}}>Public</a>
                            
                        </div>
                    </div>
                    <button className="formAdd__btn">Add</button>
                </form>
            </div>
        </AddBlogStyled>
    );
}

export default AddBlog
