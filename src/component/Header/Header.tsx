/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import {HeaderStyled} from './styled/HeaderStyled'
import { useState } from 'react';
import Login from '../Login/index'
import Post from '../Post/Post';
interface Props {}

// eslint-disable-next-line no-empty-pattern
function Header({}: Props): ReactElement {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(true);
    function showhide(){
        setShow(!show);
        setHide(false);
    }
    return (
        <HeaderStyled className="header">
            <span className="header__blog">BLOG</span>
            <a href="#" className="header__login" onClick={showhide}>Login</a>
            {show && <Login/>}
            {/* {hide && <Post/>  } */}
        </HeaderStyled>
        
    );
}

export default Header;