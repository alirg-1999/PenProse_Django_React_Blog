import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Posts from "../components/Posts";
import PostDetail from "../pages/PostDetile";
import PostEdit from "../pages/PostEdit";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/post" Component={CreatePost} />
      <Route path="/postdetail/:slug" Component={PostDetail} />
      <Route path="/profile" Component={Profile} />
      <Route path="/signup" Component={Register} />
      <Route path="/signin" Component={Login} />
      {/* create post */}
      <Route path="/posts" Component={Posts} />
      <Route path="/post-edit/:slug" Component={PostEdit} />
    </Routes>
  );
};

export default Routers;
