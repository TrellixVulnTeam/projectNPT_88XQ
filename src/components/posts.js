import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
// import './styled/PostStyled.css'
const card = {
	backgroundColor:"aliceblue",
	margin:'0px 150px',
	marginBottom: '50px',
	
}
const card__content ={
	whiteSpace: 'nowrap',
    overflow: 'hidden',
}
const card__title ={
	fontSize: '32px'
}
const a ={
	TextDecoder:'none',
	color : 'black',
	// float: 'right',
	
}
const Posts = (props) => {
	const { posts } = props;
	if (!posts || posts.results.length === 0) return <p>Can not find any posts, sorry</p>;

	
	return (
		<React.Fragment>
					{posts.results.map((post) => {
						// console.log(post.id);
						return (
							<div>
								<div style = {card} key={post.id} >
									
										<div className="card__container ">
											<span className="card__title" style = {card__title}>{post.title}</span>
											<br/>
											<small>{post.category}   .By {post.user} published at {post.updated_at}</small>
											<p className="card__content" style ={ card__content}>{post.content}</p>
										</div>
										
										<Link to ={"/postpage/" + post.id} style={a} >visit</Link>
										

								</div>
							</div>
						);
					
					})}
		</React.Fragment>
	);
};
export default Posts;
