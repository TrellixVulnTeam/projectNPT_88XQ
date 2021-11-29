/* eslint-disable prettier/prettier */
import React, { ReactElement } from 'react';
import { HeaderStyled } from './styleds/HeaderStyled';

interface Props {}

function Header({}: Props): ReactElement {
  return (
    <HeaderStyled className="header">
      
      <span className="header__text">Blog</span>
      <a href="#" className="header__login">login</a>
      
    </HeaderStyled>
  );
}

export default Header;
