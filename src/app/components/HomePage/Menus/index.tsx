import React, { ReactElement } from 'react';
import { MenuStyled } from './styleds/MenuStyled';

interface Props {}

function Menus({}: Props): ReactElement {
  return (
    <MenuStyled className="menu">
      <li className="menu__items">
        <span className="uppercase">The Matterss</span>
        <span className="menu__hightline" />
      </li>
      <li className="menu_items">
        <span className="uppercase">Pillows</span>
        <span className="menu__hightline" />
      </li>
      <li className="menu_items">
        <span className="uppercase">Bed Frames</span>
        <span className="menu__hightline" />
      </li>
      <li className="menu_items">
        <span className="uppercase">Bedding</span>
        <span className="menu__hightline" />
      </li>
      <li className="menu_items">
        <span className="uppercase">Sofa</span>
        <span className="menu__hightline" />
      </li>
      <li className="menu_items">
        <span className="uppercase">Rugs</span>
        <span className="menu__hightline" />
      </li>
    </MenuStyled>
  );
}

export default Menus;
