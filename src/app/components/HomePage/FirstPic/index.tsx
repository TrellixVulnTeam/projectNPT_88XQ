import React, { ReactElement } from 'react';
import { FirstPicstyleds } from './styleds/FirstPicstyleds';

interface Props {}

function FirstPic({}: Props): ReactElement {
  return (
    <FirstPicstyleds className="firstpic">
      <div className="firstpic__form">
        <span className="firstpic__form__h1">
          Award-Winning Sleep Has Arrived
        </span>
        <img
          className="firstpic__form__img"
          src="https://cdn.shopify.com/s/files/1/0764/8025/t/275/assets/maple-leaf-red.png?v=8342203473736130500"
          alt="mapple_leaf"
        />
      </div>
      <div>
        <a href="">
          <button className="firstpic__form__btn">shop the mattress</button>
          <button className="firstpic__form__btn">discover the mattress</button>
        </a>
      </div>
    </FirstPicstyleds>
  );
}

export default FirstPic;
