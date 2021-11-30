import styled from 'styled-components/macro';

export const LoginStyled = styled.div`
    text-align:center;
    
    .login {
        &__form {
            text-align:left;
            position: relative;
            margin:20px 400px;
            padding:20px 50px;
            background-color:aliceblue;

            &__label {
            margin-right:10px;
            }

            &__button {
                padding:10px ;
                margin:10px 55px;
                width:100px;
            }
        
            &__textbox {
                width:450px ;
                /* margin-left:20px; */
            }
        }
        
    }
`;