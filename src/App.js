import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import PostLoadingComponent from './components/postLoading';
import axiosInstance from './axios';
import { useHistory } from 'react-router-dom';

function App() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});
	const history = useHistory();
	if (!localStorage.getItem('access_token')){
		history.push("/login")
	}
	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		
		<div className="App">
		
			<a href="/addBlog" className="btn-floating btn-large waves-effect waves-light red">
				<i className="material-icons">add blogs</i></a>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;