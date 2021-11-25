import React, { ReactElement } from 'react';
import Menus from '../Menus';
import { HeaderStyled } from './styleds/HeaderStyled';

interface Props {}

function Header({}: Props): ReactElement {
  return (
    <HeaderStyled className="header">
      <div className="header__items">
        <img
          src="https://cdn.shopify.com/s/files/1/0764/8025/t/275/assets/endy_logo_tab_pink_RGB.svg?v=16802075288150995064"
          alt="logo"
          height="60px"
          width="132px"
          className="header__logo"
        />
      </div>
      <div className="header__items">
        <Menus />
      </div>
      <div className="header__items">
        <span className="uppercase mr-15">support</span>
        <span>
          <img
            src="https://cdn.shopify.com/s/files/1/0764/8025/t/275/assets/endy-cart-48x48.svg?v=15396146161102881870"
            alt="cart"
          />
        </span>
      </div>
    </HeaderStyled>
  );
}

export default Header;
