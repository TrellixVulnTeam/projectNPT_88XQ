/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useEffect, useState } from 'react';
import { AddBlogStyled } from './styled/AddBlogStyled'
interface Props {}

function AddBlog({}: Props): ReactElement {

    const [title,setTitle] = useState('')

    return(
        <AddBlogStyled>
            <div className="formAdd">
                <form action="">
                    <h1>Add Blog</h1>
                    <label htmlFor="">Title</label>
                    <input type="text" id="username" className="" value={title} onChange={e => setTitle(e.target.value) }/>
                    <br />
                    <label htmlFor="">Category</label>
                    <div className="dropdown">
                        <button className="dropdown__btn">Dropdown</button>
                        <div className="dropdown__content">
                            <a href="#" className="dropdown__a">War</a>
                            <a href="#" className="dropdown__a">Animal</a>
                            <a href="#" className="dropdown__a">Trade</a>
                        </div>
                    </div>
                    <br />
                    <label htmlFor="">Content</label>
                    <input type="password" id="password" className=""/>
                    <br />
                    <button>Add</button>
                </form>
            </div>
        </AddBlogStyled>
    );
}

export default AddBlog
