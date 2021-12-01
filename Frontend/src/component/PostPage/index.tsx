import React, { ReactElement, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {PostPageStyled} from './styled/PostPageStyled'
import {useLocation} from 'react-router-dom'
interface Props {}

function PostPage({}: Props): ReactElement {
    const location = useLocation() 
    const {postid,userid,title,body} = location.state
    
    return(
        <PostPageStyled>
            
            <div className="postpage">
                <h1>{postid}</h1>
                <h1 className = "postpage__userID">{userid}</h1>
            
                <h1 className = "postpage__title">{title}</h1>
                
                <span className="postpage__category">Category</span>
                
                <span className="postpage__date"> Ngày buồn tháng nhớ năm thương </span>
                <p className="postpage__content">{body}</p>
        </div>
        </PostPageStyled>
    );
}

export default PostPage;
