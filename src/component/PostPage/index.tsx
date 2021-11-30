import React, { ReactElement, useEffect, useState } from 'react';
import Header from '../Header/Header';
import {PostPageStyled} from './styled/PostPageStyled'
interface Props {}

function PostPage({}: Props): ReactElement {
    return(
        <PostPageStyled>
            
            <div className="postpage">
                
                <h1 className = "postpage__userID">user id</h1>
            
                <h1 className = "postpage__title">title</h1>
                
                <span className="postpage__category">Category</span>
                
                <span className="postpage__date"> Ngày buồn tháng nhớ năm thương </span>
                <p className="postpage__content">1</p>
        </div>
        </PostPageStyled>
    );
}

export default PostPage;
