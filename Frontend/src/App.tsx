

import {Routes,Route} from 'react-router-dom';
// import './App.css';
import Header from './component/Header/Header';
import Post from './component/Post/Post';
import PostPage from './component/PostPage';
import Login from './component/Login';
import AddBlog from './component/AddBlog';

function App() {
  

  return (
    <div className="App">
      <Header  />
      {/* <Post  /> */}
      <Routes>
        <Route path="/" element={<Post/>} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/add" element={<AddBlog/>} />
      </Routes>
    </div>
  );
}

export default App;
