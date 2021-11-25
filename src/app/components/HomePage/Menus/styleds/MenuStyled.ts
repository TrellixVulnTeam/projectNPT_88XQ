import styled from 'styled-components/macro';

export const MenuStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu {
    &__items {
      padding: 18px 5px;
      display; flex;
      justify-content: center;
      align-items: center;
    }

    &__items:hover .menu__hightline {
      width: 100%;
    }

    &__items {
      position: relative;
    }

    &__hightline {
      position: absolute;
      height: 4px;
      width: 0%;
      background-color: #c40058;
      bottom: 0;
      margin: 0 auto;
      transition: width 0.5s;
    }
  }
  `;
