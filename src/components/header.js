import React from 'react';
import { useEffect,useState } from 'react';

function Header() {
	const [isLogin, setIsLogin] = useState(false);
	const [username, setUsername] = useState(null)
	
	useEffect (() => {
		if (localStorage.getItem('access_token')) {
			setIsLogin(true);
			setUsername(localStorage.getItem('username'))
		}
	},[setIsLogin])
	if (isLogin === false){
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="/" className="brand-logo">Blog</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="/register">Register</a></li>
						<li><a href="/login">Login</a></li>
					</ul>
				</div>
			</nav>
		);
	}
	else {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="/" className="brand-logo">Blog</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
	
						<li><a href="/">{username}</a></li>
						<li><a href="/Logout">Logout</a></li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;