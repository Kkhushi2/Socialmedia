import React, { useState } from 'react';
import { Button, Grid, styled, TextField } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
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
export default function Changepassword() {
    const dispatch = useDispatch()
    var classes = useStyles()
    const userData = useSelector((state) => state.user)
    const user = Object.values(userData)[0]
    console.log(userData)
    const [userid, setUserid] = useState(user.userid)
    const [oldpassword, setOldPassword] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [confirmnewpassword, setConfirmPassword] = useState('')

    const handleEdit = async () => {
        var body = { newpassword: newpassword, userid: userid, password: oldpassword }
        var result = await postData("user/changepassword", body)
        if (result.status) {
            dispatch({ type: "ADD_USER", payload: [user.userid, { ...user, ...body }] })

        }
        else {
            alert("not edited")
        }
    }






    return (
        <div style={{ backgroundColor: '#121212', color: '#fff', fontFamily: 'sans-serif' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px' }}>
                <Grid container style={{ width: "80%", border: "1px solid #363636", backgroundColor: "black" }}>
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', borderRight: '1px solid #363636' }}>
                    </Grid>
                    <Grid item xs={9} style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                        <Grid item container xs={9} spacing={3} style={{ display: 'flex', alignItems: 'center' }}>


                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }} >
                                Old Password
                            </Grid>
                            <Grid item xs={9}>
                                <CssTextField value={oldpassword} type="text" id="outlined-size-small"
                                    size="small" onChange={(event) => setOldPassword(event.target.value)} fullWidth inputProps={{ className: classes.input }} />
                            </Grid>
                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                            </Grid>

                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }} >
                                New Password
                            </Grid>
                            <Grid item xs={9} >
                                <CssTextField value={newpassword} onChange={(event) => setNewPassword(event.target.value)} type="text" style={{ color: '#fff' }} id="outlined-size-small"
                                    size="small" fullWidth inputProps={{ className: classes.input }} />

                            </Grid>
                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                            </Grid>


                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                Confirm New Password
                            </Grid>
                            <Grid item xs={9} >
                                <CssTextField value={confirmnewpassword} onChange={(event) => setConfirmPassword(event.target.value)} type="text" style={{ color: '#fff' }} id="outlined-size-small"
                                    size="small" inputProps={{ className: classes.input }} />
                            </Grid>



                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                            </Grid>
                            <Grid item xs={9} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='contained' onClick={() => handleEdit()} style={{ width: '20%', backgroundcolor: '#0095F6' }} >Submit</Button>
                                <a href="#" style={{ textDecoration: 'none', fontSize: '18px' }}>Temporarily deactivate my account</a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>


        </div>

    )
}