import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';


const Posts = (props) => {
	const { posts } = props;
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
					{posts.results.map((post) => {
						return (
							<div className="row">
								<div className="col s12 m6">
									<div className="card blue-grey darken-1">
										<div className="card-content white-text">
											<span className="card-title">{post.title}</span>
											<small>{post.category}   .By {post.user} published at {post.updated_at}</small>
											<p>{post.content}</p>
										</div>
										<div className="card-action">
											<a href="/">Visit</a>
										</div>
									</div>
								</div>
							</div>
						);
					})}
		</React.Fragment>
	);
};
export default Posts;
