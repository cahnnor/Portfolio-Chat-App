import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import * as React from "react";
import './App.css';
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"
import Login from "./pages/Login"
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { useContext } from 'react'
import PermissionDenied from "./pages/PermissionDenied";
import UserPage from "./pages/UserPage";

function App() {
  
  
  return (
    <Router>
    <div className="App">
      <div className="App-header">
      <AuthProvider>
        <Routes>
        <Route path="login/" element={<Login />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/room/:id" element = {<RoomPage />}></Route>
        <Route path="create-room/" element = {<CreatePage />}></Route>
        <Route path="room/:id/update" element={<UpdatePage/>}></Route>
        <Route path="denied/" element={<PermissionDenied/>}></Route>
        <Route path="/user/:username" element={<UserPage/>}></Route>
        </Routes>
        </AuthProvider>
      </div>
    </div>
    </Router>
  );
}

/* I suppose to check if we are authenticated we need to make a request to /token to determine if there has been a login or not using fetch.*/
/*
const AuthLayout = () => {
  if (Parse.User.current() !== null) {
    /*const isAuthenticated = Parse.User.current().getSessionToken();  
    return isAuthenticated ? <Outlet /> : null; // or loading indicator, etc...
  }
  return <Navigate to={"/login"} replace />;
};
*/
export default App;
