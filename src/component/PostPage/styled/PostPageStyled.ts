import styled from 'styled-components/macro';
export const PostPageStyled = styled.div`
    margin:0px 200px;
    padding: 20px 50px;
    font-size:16px;
    .a{
        text-decoration:none;
        color:black;
    }
    .postpage{
        margin-bottom:100px;
        &__title{
            font-size:2rem;
        }
        &__category{
            font-size:1rem;
            padding-right:50px;
            font-weight:bold;
        }
        &__date{
            font-weight:bold;
            font-size:1rem;
        }
    }
`;
