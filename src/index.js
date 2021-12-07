import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';

import Register from './components/register';
import SignIn from './components/login';
import Logout from './components/logout';
import Upload from './components/upLoadBlog';
import PostPage from './components/postpage';
import Edit from './components/edit'
const routing = (
	<Router>
		<React.StrictMode>
		<Header />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={SignIn} />
				<Route path="/logout" component={Logout} />
				<Route path="/addBlog" component = {Upload} />
				<Route path="/postpage/:id" component = {PostPage} />
				<Route path="/edit/:id" component = {Edit} />
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();