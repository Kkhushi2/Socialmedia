import { Button, Grid, styled, TextField } from "@mui/material";
import React, { useEffect } from "react";
import logo from "../assets//logo.png";
import { useState } from "react"
import { postData, ServerURL } from "../FetchNodeServices"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import userlogo from '../assets/user.jpg'
import setting from '../assets/setting.png'
import { useSelector, useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Divider } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function Profile() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const user = Object.values(userData)[0]
  console.log(user)
  var navigate = useNavigate()
  const [refresh, setRefresh] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [removephoto, setRemovephoto] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSettings, setOpenSettings] = React.useState(null);
  const sopen = Boolean(anchorEl);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    navigate('/editprofile')

  }


  const handleOpenSettings = (event) => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleRemovephoto = async () => {
    let body = { userid: user.userid }
    const result = await postData('user/removephoto', body)
    if (result.status) {
      dispatch({ type: "ADD_USER", payload: [user.userid, { ...user, picture: "" }] })
      setRefresh(!refresh)
    }
    setOpen(false)
  }
  const fetchallfollowersandfollowing = async () => {
    let body = { userid: user.userid }
    const result = await postData('user/getfollowerandfollowing', body)
    if (result.status) {
      dispatch({ type: "ADD_USER", payload: [user.userid, { ...user, follower: result.data[0].followers, following: result.data[1].following }] })
    }
    setRefresh(!refresh)
  }
  useEffect(() => {
    fetchallfollowersandfollowing()
  }, [])
  const fetchAllFollowers = async () => {
    let body = { userid: user.userid }
    const result = await postData('user/getfollowers', body)
    if (result.status) {
      // setfetchfollowers("follow")
    }
    setOpen(false)
  }


  const handleSettings = () => {
    return (
      <Dialog onClose={handleCloseSettings} maxWidth="xs" fullWidth open={openSettings} PaperProps={{ style: { backgroundColor: "#262626", color: "#fff", borderRadius: 13, justifyContent: "center", alignItems: "center", width: "90%", height: "90%" } }}>


        <List sx={{ pt: 0 }} style={{ width: "100%" }}>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Change Password
            </div>
          </div>

          <Divider color="#363636" />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Professional Account
            </div>
          </div>
          <Divider color="#363636" />


          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              QR Code
            </div>
          </div>
          <Divider color="#363636" />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Apps and Website
            </div>
          </div>
          <Divider color="#363636" />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Notifications
            </div>
          </div>
          <Divider color="#363636" />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Privacy and Security
            </div>
          </div>
          <Divider color="#363636" />


          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Login Activity
            </div>
          </div>
          <Divider color="#363636" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Emails from Instagram
            </div>
          </div>
          <Divider color="#363636" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Report a Problem
            </div>
          </div>
          <Divider color="#363636" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Embed
            </div>
          </div>
          <Divider color="#363636" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Log Out
            </div>
          </div>
          <Divider color="#363636" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 14 }} >
              Cancel
            </div>
          </div>




        </List>
      </Dialog>
    );
  }



  const handleUploadImage = async (event) => {
    console.log(event.target.files[0])
    let formData = new FormData()
    formData.append('picture', event.target.files[0])
    formData.append('userid', user.userid)
    const result = await postData('user/updateprofile', formData)
    if (result.status) {
      setOpen(false)
      dispatch({ type: "ADD_USER", payload: [user.userid, { ...user, picture: result.data }] })
      setRefresh(!refresh)
    }

  }

  const showDialog = () => {
    return (
      <Dialog onClose={handleClose} maxWidth="xs" fullWidth open={open} PaperProps={{ style: { backgroundColor: "#262626", color: "#fff", borderRadius: 15, justifyContent: "center", alignItems: "center", width: "100%" } }}>
        <div style={{ color: "white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 15 }}>
          <DialogTitle>Change Profile Photo</DialogTitle>
        </div>
        <Divider color="#363636" />

        <List sx={{ pt: 0 }} style={{ width: "100%" }}>
          <label for="selectimage">


            <div onClick={(event) => handleUploadImage(event)}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ color: "#00a8ff", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 12 }} id="selectimage" >
                  Upload Photo
                </div>
              </div>

            </div>
          </label>


          <Divider color="#363636" />

          <div onClick={() => handleRemovephoto()}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ color: "#e74c3c", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 12 }} value={removephoto}>
                Remove Current Photo
              </div>
            </div>

          </div>


          <Divider color="#363636" />

          <div onClick={(event) => handleClose(event.target.value)}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ color: "white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 12 }}  >
                Cancel
              </div>
            </div>

          </div>


        </List>

      </Dialog>
    );
  }

  console.log(user)


  return (
    <div style={{ backgroundColor: "#121212", color: "white" }}>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid container style={{ width: "80%", paddingLeft: 20, paddingRight: 20, paddingTop: 30, }}>
          <Grid item xs={4}>
            <input type="file" id="selectimage" onChange={(event) => handleUploadImage(event)} style={{ display: "none" }} />
            <label for={user.picture != "" ? "" : "selectimage"} onClick={() => user.picture != "" ? handleClickOpen() : ""}>
              <img src={user.picture != "" ? `${ServerURL}/images/${user.picture}` : userlogo} style={{ width: 150, height: 150, borderRadius: "100% ", position: "relative", left: "100px", cursor: "pointer" }} />
            </label>
          </Grid>
          <Grid item xs={8}>
            <div style={{ fontSize: 28, display: 'flex', alignItems: "center" }}>{user.username} <Button onClick={() => handleEditProfile()} variant="outlined" size="small" style={{ border: "1px solid #363636", color: "white", textTransform: "capitalize", marginLeft: "15px" }}>Edit Profile
            </Button><Button onClick={() => handleOpenSettings()} id="settings" ><img src={setting} style={{ width: 33, height: 33, marginRight: 30 }} /></Button></div>
            <div>
              <div style={{ fontSize: '18px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', padding: '2px', width: '45%' }}>
                post
                <span >
                  {user.follower} followers
                </span>
                <span >
                  {user.following} following
                </span>
              </div>

            </div>
            <div style={{ marginTop: '20px', justifyContent: "center", marginLeft: "15px" }}>{user.fullname}</div>
            <div>{user.bio}</div>
            <div><a href="https://khushisappal.com" style={{ textDecorationLine: "none" }}>{user.website}</a></div>
          </Grid>,
        </Grid>
      </div>
      {showDialog()}
      {handleSettings()}
    </div>

  )


}
export default Profile;