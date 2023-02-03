import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import logowhite from "../assets//logowhite.jpg";
import { Divider, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from "react"
import { postData, ServerURL } from "../FetchNodeServices"
import userlogo from '../assets/user.jpg'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Dialog from '@mui/material/Dialog';
import photovideo from '../assets/photovideo.jpg'
import Stack from '@mui/material/Stack';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';






export default function Header() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const user = Object.values(userData)[0]
  console.log(user)
  var navigate = useNavigate()

  const [userid, setUserid] = useState('')
  const [followrequestbyreciever, setFollowRequestByReciever] = useState([])
  const [open, setOpen] = React.useState(false);
  console.log(user)
  const [refresh, setRefresh] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postopen, setPostOpen] = React.useState(false);
  const [cropopen, setCropOpen] = React.useState(false);
  const [crop, setCrop] = useState('')
  const [files, setFiles] = useState([])
  const menuopen = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickPost = () => {
    setPostOpen(true);
  };

  const handleClose = () => {
    setPostOpen(false);
  };
  const handleCropPost = (event) => {
    setCropOpen(true);
  };

  const handleCropClose = () => {
    setCropOpen(false);
  };



  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: "black",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const handleFollowRequestByReciever = async () => {
    let body = { recieveruserid: user.userid }
    const result = await postData("user/followrequestbyreciever", body)
    if (result.status) {
      setFollowRequestByReciever(result.data)

    }

  }
  const handleConfirm = async (data) => {
    let body = { recieveruserid: data.recieveruserid, senderuserid: data.senderuserid }
    const result = await postData("user/confirmrequest", body)
    if (result.status) {
      alert('here')
      handleFollowRequestByReciever()
      setOpen(false)
    }



  };



  const handleDelete = async (data) => {
    let body = { reciveruserid: data.recieveruserid, senderuserid: data.senderuserid }
    const result = await postData("user/deleterequest", body)
    if (result.status) {
      handleFollowRequestByReciever()
      setOpen(false)
    }


  };


  const handleFilesUpload = (event) => {
    var arr = Object.values(event.target.files)
    arr.splice(10)
    setFiles(arr)
    setCropOpen(true)
    setPostOpen(false)
  }
  const addphotos = (event) => {
    var arr = Object.values(event.target.files)
    if(arr.length<10)
    { setFiles(arr)}
   
    setCropOpen(true)
    setPostOpen(false)
  }
  const handleDeleteImage = (i) => {
    const arr = [...files]
    arr.splice(i, 1)
    setFiles(arr)
    if(arr.lenghth==0){
      setCropOpen(false)
      setPostOpen(true)
    }
}

  const showMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuopen}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#262626',
            width: 350,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 30,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 13,
              width: 8,
              height: 10,

              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >{followrequestbyreciever.map((item, index) => {
        return (
          <div style={{ display: "flex", alignItems: "center", padding: "10px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
              <img width="34" height="34" style={{ borderRadius: "100%", marginRight: "10px" }} src={item.picture != "" ? `${ServerURL}/images/${item.picture}` : userlogo}
                onClick={() => navigate("/" + item.username)}></img>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: "white" }} onClick={() => navigate("/" + item.username)}>{item.username} </div>
                <div style={{ fontSize: '14px', color: '#8a8a8a', marginBottom: '10px' }} onClick={() => navigate("/" + item.username)}>{item.fullname} </div>
              </div>
            </div>
            <div><Button variant="outlined" size="small" style={{ border: "1px solid #363636", backgroundColor: "#0095f6", color: "white", textTransform: "capitalize", marginLeft: "15px" }} onClick={() => handleConfirm(item)}>Confirm</Button><Button variant="outlined" size="small" style={{ border: "1px solid #363636", backgroundColor: "#0095f6", color: "white", textTransform: "capitalize", marginLeft: "15px" }} onClick={() => handleDelete(item)}>Delete</Button></div>

          </div>


        )

      })}

      </Menu>




    );
  }
  const showDialog = () => {
    return (
      <Dialog onClose={handleClose} maxWidth="xs" fullWidth
        open={postopen} PaperProps={{ style: { backgroundColor: "#262626", color: "#fff", borderRadius: 10, alignItems: "center", height: "80%" } }}>
        <div style={{ padding: 10, width: "95%", textAlign: "center" }}>
          Create New Post
          <hr color="#363636" style={{ width: '99%' }} />
        </div>


        <div style={{ color: "white", display: "flex", justifyContent: "center", padding: 15, flexDirection: 'column', alignItems: "center", height: "100%" }}>
          <img src={photovideo}></img>
          <div style={{ fontSize: 18, fontWeight: 300 }}>
            Drag photos and videos here
          </div>
          <div style={{ marginTop: 20 }} >
            <Stack direction="row" spacing={2}>
              <Button size="medium" variant="contained" component="label" style={{ marginTop: 10 }}
              >
                Select from computer
                <input hidden accept="image/*,video/*" onChange={handleFilesUpload} multiple type="file" />
              </Button>
            </Stack>
          </div>
        </div>


      </Dialog>
    );
  }
  const showCrop = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    


    return (

      <Dialog onClose={handleCropClose} value={crop} maxWidth="xs" fullWidth
        open={cropopen} PaperProps={{ style: { backgroundColor: "#262626", color: "#fff", borderRadius: 10, alignItems: "center", height: "80%" } }}>
        <div style={{ paddingTop: 10, paddingBottom: 10, width: "100%", textAlign: "center" }}>
          Create New Post
          <hr color="#363636" style={{ width: '99%' }} />
        </div>
        <div style={{ width: 350 }}>
          <Slider {...settings}>
            {files.map((item) => (<img src={URL.createObjectURL(item)} width="350" height="300" />))}
          </Slider>
        </div>
      <div style={{width:120,display:"flex",flexDirection:"row",marginRight:10,justifyContent:"center",marginTop:25,paddingInlineEnd:10,marginRight:"30px"}}>
  
            {files.map((item,index) => (<img src={URL.createObjectURL(item)} title="Delete" width="50" height="70" paddingInlineEnd="10" justifyContent="space-between" className='imgcursor' onClick={() => handleDeleteImage(index)} style={{margin:7}} />))  }
            

          
            
            
            
            
            
          
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={(event) => {
              addphotos(event)

              }}
            >
              < AddCircleOutlineIcon />

            </IconButton>

           
         
      </div>




      </Dialog>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logowhite} alt="logowhite" style={{ width: "95%", height: "70px" }} />
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={(event) => {
                handleClickMenu(event)
                handleFollowRequestByReciever()
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={(event) => {
                handleClickPost(event)

              }}
            >
              < AddBoxOutlinedIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            // onClick={() => {
            //   handleLogout()

            // }}
            >
              <AccountCircle />
            </IconButton>





          </Box>
        </Toolbar>
      </AppBar>
      <Divider color="#363636" />
      {showMenu()}
      {showDialog()}
      {showCrop()}
    </Box>
  );

}
