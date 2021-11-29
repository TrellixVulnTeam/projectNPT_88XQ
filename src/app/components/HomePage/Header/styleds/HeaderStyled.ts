/* eslint-disable prettier/prettier */
import { Children } from 'hoist-non-react-statics/node_modules/@types/react';
import { ClientRequest } from 'http';
import styled from 'styled-components/macro';

export const HeaderStyled = styled.header`
  background-color: aliceblue;

  .header{
    font-size: 16px;
    
    display:flex;
    
    &__text{
      font-size:3rem;
      font-weight:bold;
      padding:10px;
   }
   &__login{
     text-decoration:none;
     color:black;
     /* justify-content:space-between; */
     float:right;
     padding:20px
   }
  }
`;
