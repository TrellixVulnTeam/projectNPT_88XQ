import styled from 'styled-components/macro';

export const HeaderStyled = styled.div`
    font-size:20px;
    padding:10px;
    background-color:aliceblue;
    .header{
        &__blog{
            font-weight:bold;
            font-size:3rem;
        }
        &__login{
            padding:15px;
            text-decoration:none;
            color:black;
            float:right;
        }
    }
`;