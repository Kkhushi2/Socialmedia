import { Button, Grid, styled, TextField } from "@mui/material";
import React from "react";
import logo from "../assets//logo.png";
import { useState, useEffect } from "react"
import { postData, ServerURL } from "../FetchNodeServices"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import userlogo from '../assets/user.jpg'
import setting from '../assets/setting.png'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



function Userprofile() {
    var navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)
    const user = Object.values(userData)[0]
    const params = useParams()
    const [btnstatus, setBtnstatus] = useState("follow")
    const [userid, setUserid] = useState('')
    const [getUserData, setUserData] = useState({})
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const fetchUserData = async () => {
        let body = { username: params.username, userid: user.userid }
        var result = await postData("user/userbyuserid", body);
        if (result.status) {
            setUserData(result.data)
            if(result.data.requeststatus!=null){
                setBtnstatus('requested')
            }
        }
    }

    const handleRequest = async () => {
        let body = { recieveruserid: getUserData.userid, senderuserid: user.userid }
        const result = await postData("user/followrequest", body)
        if (result.status) {
            setBtnstatus("requested")
        }
    }
    const handleCancelRequest = async () => {
        let body = { recieveruserid: getUserData.userid, senderuserid: user.userid }
        const result = await postData("user/deletefollowrequest", body)
        if (result.status) {
            setBtnstatus("follow")
        }
        setOpen(false)
    }
   

    const showDialog = () => {
        return (
          <Dialog onClose={handleClose} maxWidth="xs" fullWidth open={open} PaperProps={{ style: { backgroundColor: "#262626", color: "#fff", borderRadius: 15, justifyContent: "center", alignItems: "center", width: "100%" } }}>
           <div style={{ color: "white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 15 }}>

    </div>

              
            <List sx={{ pt: 0 }} style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ color:"#e74c3c", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 15 }}>
                    <img src={getUserData.picture != "" ? `${ServerURL}/images/${getUserData.picture}` : userlogo} style={{ width: 150, height: 150, borderRadius: "100% ", position: "relative" }} />
                    </div>
                  </div>
                  <div style={{textAlign:'center'}}>if you change your mind you'll have to request to join @{getUserData.username} again.</div>  
                
    
              <Divider color="#363636" />
              
              
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ color:"#e74c3c", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 12,cursor:"pointer" }}  onClick={() => handleCancelRequest()} >
                      Unfollow
                    </div>
                  </div>
            
               
              
           
              <Divider color="#363636" />
              
              <div onClick={(event) => handleClose(event.target.value)}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ color:"white", fontWeight: "bold", display: "flex", justifyContent: "center", padding: 12 ,cursor:"pointer"}}  >
                      Cancel
                    </div>
                  </div>
            
                </div>
              
    
            </List>
    
          </Dialog>
        );
      }

    useEffect(function () {
      if (params.username!=user.username) {
        navigate('/profile')
      }
      else{
      fetchUserData()
      }
    },[params.username] );
        
    




    return (
        <div style={{ backgroundColor: "#121212", color: "white" }}>
            <Header />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Grid container style={{ width: "80%", paddingLeft: 20, paddingRight: 20, paddingTop: 30, }}>
                    <Grid item xs={4}>
                        <img src={getUserData.picture != "" ? `${ServerURL}/images/${getUserData.picture}` : userlogo} style={{ width: 150, height: 150, borderRadius: "100% ", position: "relative", left: "100px", }} />

                    </Grid>
                    <Grid item xs={8}>
                        <div style={{ fontSize: 28, display: 'flex', alignItems: "center" }}>{getUserData.username}
                            {btnstatus == "follow" ? <Button variant='contained' size="small" onClick={handleRequest} style={{ backgroundColor: '#0984e3', fontWeight: "bold", marginLeft: '20px', textTransform: 'capitalize' }}>Follow</Button> : null}
                            {btnstatus == "requested" ? <Button variant='outlined' size="small"  onClick={()=>handleClickOpen()}  style={{ border: "1px solid #363636", color: "white", textTransform: "capitalize", backgroundColor: 'black', fontWeight: "bold", marginLeft: '20px',borderWidth:'1px' }}>Requested</Button> : null}
                        </div>
                        <div style={{ marginTop: '20px', justifyContent: "center", marginLeft: "15px" }}>{getUserData.fullname} </div>
                        <div>{getUserData.bio}</div>
                        <div><a href="https://khushisappal.com" style={{ textDecorationLine: "none" }}>{getUserData.website}</a></div>
                    </Grid>,
                </Grid>
            </div>
{showDialog()}
        </div>

    )


}
export default Userprofile;