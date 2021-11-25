import { Children } from 'hoist-non-react-statics/node_modules/@types/react';
import { ClientRequest } from 'http';
import styled from 'styled-components/macro';

export const FirstPicstyleds = styled.section`
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;

  .firstpic {
    &__form {
      align-items: center;
      background-image: url('https://cdn.shopify.com/s/files/1/0764/8025/files/Endy-Home-Page-Hero-1440x645-2x.jpg?v=1574700603');

      &__h1 {
        font-size: 3rem;
      }

      &__img {
        height: 55px;
        width: 55px;
        margin: 0px 0px 40px 10px;
      }

      &__btn {
        text-transform: uppercase;
        font-size: 0.9rem;
        margin: 0px 0px 0px 10px;
      }
    }
  }
`;
