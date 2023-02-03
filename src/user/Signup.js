import { Button, styled, TextField } from "@mui/material";
import React from "react";
import logo from "../assets//logo.png";
import { useState } from "react"
import { postData} from "../FetchNodeServices"
import image from "../assets/image.gif";


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

function SignUp() {
    const [mobileemail, setMobileEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
    
   

 const handleSubmit = async () => {


  var body = {mobileemail:mobileemail,fullname:fullname,password:password,username:username, }
    var result = await  postData("user/signup", body)
    if(result.result)
        {
            alert("Submitted successfully")
        }
        else{
            alert("not submitted")
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
        flexDirection:"row"
      }}
    ><div>
    <img src={image}></img>
</div>
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
            placeholder="Mobile no or Email"
            id="outlined-size-small"
            size="small"
            fullWidth
            style={{ marginTop: "30px" }}
            onChange={(event) => setMobileEmail(event.target.value)}
          />
          <CssTextField
            placeholder="Full Name"
            id="outlined-size-small"
            size="small"
            fullWidth
            style={{ marginTop: "10px" }}
            onChange={(event) => setFullname(event.target.value)}
          />
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
            input type={password}
            fullWidth
            style={{ marginTop: "10px" }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div style={{ textAlign: "center", fontSize: "12px",marginTop:'5px' }}>
            People who use our service may have uploaded your contact
            information to Instagram. Learn More
            <br />
            <br /> By signing up, you agree to our Terms , Privacy Policy and
            Cookies Policy .
          </div>
          <Button
            fullWidth
            style={{ marginTop: "20px" }}
            variant="contained"
            size="small"
            onClick={() => handleSubmit()} 
          >
            Sign Up
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
        Have an account? Log in
      </div>
    </div>
  );
}

export default SignUp;
