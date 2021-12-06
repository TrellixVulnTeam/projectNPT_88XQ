import styled from 'styled-components/macro';

export const PostStyled = styled.div`
    margin:0px 200px;
    padding: 20px 50px;
    font-size:16px;
    
    .a{
        text-decoration:none;
        color:black;
    }
    .btnADD{
        position: absolute;
        padding:20px 40px;
        left:10px;
    }
    .post{
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
        &__content{
            height:110px;
            word-wrap:break-word;
            overflow:hidden;
            text-overflow: ellipsis;
            
        }
    }
`;