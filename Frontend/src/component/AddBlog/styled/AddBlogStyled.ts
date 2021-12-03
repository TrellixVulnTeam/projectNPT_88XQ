import styled from 'styled-components/macro';

export const AddBlogStyled = styled.div`
    margin:0px 200px;
    padding: 20px 50px;
    font-size:16px;

    .dropdown{
        position: relative;
        display: inline-block;

        &__btn{
            background-color: #04AA6D;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
        }
        &__content{
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;       
        }
        &__a{
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        &__a:hover{
            background-color: #ddd;
        }
    }
    .dropdown:hover .dropdown__content{display: block;}
    .dropdown:hover .dropdown__btn {background-color: #3e8e41;}
`;