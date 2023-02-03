import { Button, styled, TextField } from "@mui/material";
import React from "react";
import logo from "../assets//logo.png";
import { useState } from "react"
import { postData } from "../FetchNodeServices"
import { useNavigate } from "react-router-dom";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { Link } from "react-router-dom";
import image from "../assets/image.gif";
import { useDispatch } from "react-redux";


const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

function Login() {
  const [userid, setUserid] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  var navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {


    var body = { password: password, username: username, userid: userid }
    var result = await postData("user/login", body)
    if (result.status) {
      dispatch({ type: "ADD_USER", payload: [result.data.userid, result.data] })
      navigate('/profile')
    }
    else {
      alert("Invalid Id/Password")
    }
  }



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fafafa",
        flexDirection: "row"
      }}
    ><div>
        <img src={image}></img>
      </div>
      <div>
        <div
          style={{
            width: "25vw",
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #D3D3D3",
            padding: "20px",
            backgroundColor: "#fff"
          }}
        >
          <div
            style={{
              flexDirection: "column",
              width: "75%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="logo" style={{ width: "50%", height: "40px" }} />
            <div
              style={{ textAlign: "center", fontSize: "17px", fontWeight: "600" }}
            >
              Sign up to see photos and videos from your friends.
            </div>

            <CssTextField
              placeholder="Username"
              id="outlined-size-small"
              size="small"
              fullWidth
              style={{ marginTop: "10px" }}
              onChange={(event) => setUsername(event.target.value)}
            />
            <CssTextField
              placeholder="Password"
              id="outlined-size-small"
              size="small"
              input type="password"
              fullWidth
              style={{ marginTop: "10px" }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div style={{ textAlign: "center", fontSize: "12px", marginTop: '5px' }}>

            </div>
            <Button
              fullWidth
              style={{ marginTop: "20px" }}
              variant="contained"
              size="small"
              onClick={() => handleSubmit()}
            >
              Log in
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "25vw",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #D3D3D3",
            padding: "20px",
            backgroundColor: "#fff"
          }}
        >
          Don't have an account?

          <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
            <ListItemText>Signup</ListItemText>
          </Link>


        </div></div>
    </div>
  );
}

export default Login;
