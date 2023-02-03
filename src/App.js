import Login from './user/Login';
import Signup from './user/Signup';
import Header from './user/Header';
import Profile from './user/Profile';
import Editprofile from './user/Editprofile';
import Userprofile from './user/Userprofile';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import Changepassword from './user/Changepassword';

function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Signup/>} path={"/signup"} />
          <Route element={<Login/>} path={"/login"} />
          <Route element={<Header/>} path={"/header"} />
          <Route element={<Profile/>} path={"/profile"} />
          <Route element={<Editprofile/>} path={"/editprofile"} />
          <Route element={<Userprofile/>} path={"/:username"} />
          <Route element={<Changepassword/>} path={"/changepassword"} />
          
        </Routes>
      </Router>
    </div>
  )
}

export default App;