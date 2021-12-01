/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import {HeaderStyled} from './styled/HeaderStyled'
import Login from '../Login/index'
import Post from '../Post/Post';
import {Link } from 'react-router-dom';
interface Props {}

// eslint-disable-next-line no-empty-pattern
function Header({}: Props): ReactElement {
    
    return (
        <HeaderStyled className="header">
            <span className="header__blog">BLOG</span>
            <Link to ="/login" className="header__login">
                Login
            </Link>
            
           
        </HeaderStyled>
        
    );
}

export default Header;