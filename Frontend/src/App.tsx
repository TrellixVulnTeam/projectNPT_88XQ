import React, { useState } from 'react';
import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom';
// import './App.css';
import Header from './component/Header/Header';
import Post from './component/Post/Post';
import PostPage from './component/PostPage';
import Login from './component/Login';

function App() {
  

  return (
    <div className="App">
      <Header  />
      {/* <Post  /> */}
      <Routes>
        <Route path="/" element={<Post/>} />
        <Route path="/postpage" element={<PostPage/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
