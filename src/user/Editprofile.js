import React, { useState } from 'react';
import { Button, Grid, styled, TextField } from "@mui/material";
import { useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { postData } from '../FetchNodeServices';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Header from "./Header"
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "grey",
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
            borderColor: "grey",
        },
    },
});
const useStyles = makeStyles({
    input: {
        color: "white !important"
    }
});
export default function EditProfile() {
    const dispatch=useDispatch()
    var classes=useStyles()
    const userData=useSelector((state)=>state.user)
const user=Object.values(userData)[0]
console.log(userData)
  const [userid, setUserid] = useState(user.userid)
  const [fullname,setFullName]=useState(user.fullname)
  const [username, setUsername] = useState(user.username)
  const [website, setWebsite] = useState(user.website)
  const [bio, setBio] = useState(user.bio)
  const [mobileemail, setMobileemail] = useState(user.mobileemail)
  const handleEdit=async()=>{
    var body={mobileemail:mobileemail,fullname:fullname,username:username,website:website,bio:bio,userid:userid}
    var result = await postData("user/editprofile", body)
    console.log(result)
    if (result.result) {
    dispatch({type:"ADD_USER",payload:[user.userid,{...user,...body}]})
       
    }
    else {
      alert("not edited")
    }
  }

  
  


   
    return (
        <div style={{ backgroundColor: '#121212', color: '#fff',fontFamily:'sans-serif' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px' }}>
                <Grid container style={{ width: "80%", border: "1px solid #363636", backgroundColor: "black" }}>
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', borderRight: '1px solid #363636' }}>
                    </Grid>
                    <Grid item xs={9} style={{padding:'20px',display:'flex',justifyContent:'center',flexDirection:'column'}} >
                        <Grid item container xs={9} spacing={3} style={{display:'flex',alignItems:'center'}}>
                       
                        
                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }} >
                            Name
                        </Grid>
                        <Grid item xs={9}>
                            <CssTextField value={fullname}   type="text" id="outlined-size-small"
                                size="small" onChange={(event) => setFullName(event.target.value)} fullWidth inputProps={{ className: classes.input }} />
                        </Grid>
                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                           
                        </Grid>
                        <Grid item xs={9} style={{ fontSize: '14px'}}>
                                You are using the same name on Instagram and Facebook. Go to Facebook to <a href="#" style={{ color: '#0095F6',fontSize: '16px', textDecoration: 'none' }}>Change Name. </a>
                            </Grid>

                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }} >
                            Username
                        </Grid>
                        <Grid item xs={9} >
                            <CssTextField value={username} onChange={(event) => setUsername(event.target.value)} type="text" style={{ color: '#fff' }} id="outlined-size-small"
                                size="small" fullWidth inputProps={{ className: classes.input }} />
                            
                        </Grid>
                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            
                        </Grid>
                        <Grid item xs={9} style={{ fontSize: '14px'}}>
                                In most cases, you'll be able to change your username back to for another 14 days <a href="#" style={{ color: '#0095F6',fontSize: '16px', textDecoration: 'none' }}>Learn more </a>
                            </Grid>

                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            Website
                        </Grid>
                        <Grid item xs={9} >
                            <CssTextField value={website} onChange={(event) => setWebsite(event.target.value)}  type="text" style={{ color: '#fff' }} id="outlined-size-small"
                                size="small" inputProps={{ className: classes.input }} />
                        </Grid>

                        <Grid item xs={3}  style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            Bio
                        </Grid>
                        <Grid item xs={9} >
                          
                                <TextareaAutosize
                                  maxRows={4}
                                  aria-label="maximum height"
                                 value={bio}
                                 onChange={(event) => setBio(event.target.value)} 
                                  style={{ color: '#fff',backgroundColor:'#000',width: 200 }}
                                 
                                 />
                        </Grid>

                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                        </Grid>
                        <Grid item xs={9} >
                            Personal information<br />
                            <Grid style={{ fontSize: '16px' }}>Provide your personal information even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                            </Grid>
                        </Grid>

                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                             Mobile and Email
                        </Grid>
                        <Grid item xs={9}>
                            <CssTextField  type="text" style={{ color: '#fff' }} id="outlined-size-small"
                                size="small" value={mobileemail} onChange={(event) => setMobileemail(event.target.value)}  inputProps={{ className: classes.input }} />
                        </Grid>

                       

                        <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                        </Grid>
                        <Grid item xs={9} style={{display:'flex',justifyContent:'space-between'}}>
                            <Button variant='contained' onClick={()=>handleEdit()}  style={{ width: '20%',backgroundcolor: '#0095F6' }} >Submit</Button>
                            <a href="#" style={{ textDecoration: 'none', fontSize: '18px' }}>Temporarily deactivate my account</a>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
                
            </div>


        </div>

    )
}