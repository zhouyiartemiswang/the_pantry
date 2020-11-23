import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControlLabel, Switch  } from '@material-ui/core';
import './style.css';
import API from '../../utils/API';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "grey",
        color: "white",
    },
}));

export default function Signup(props) {
    const classes = useStyles();
    let history = useHistory();
    const [signUpFormState, setSignUpFormState] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        isOwner: false,
        street: "",
        city: "",
        state: "",
        zip: ""
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "isOwner"){
            setSignUpFormState({
                ...signUpFormState,
                isOwner: !signUpFormState.isOwner
            });
        }
        else{
            setSignUpFormState({
                ...signUpFormState,
                [name]: value,
                address: `${signUpFormState.street}, ${signUpFormState.city}, ${signUpFormState.state} ${signUpFormState.zip}`
            });
        }
        props.setProfileState({
            ...props.profile,
            signUpError: ""
        });
    };

    function handleSignUp(event){
        event.preventDefault();
        //console.log(signUpFormState);
        const data = {
            username : signUpFormState.username,
            email : signUpFormState.email,
            password : signUpFormState.password,
            address : signUpFormState.address,
            phone : signUpFormState.phone,
            isOwner : signUpFormState.isOwner
        }
        console.log(data);
        API.createUser(data).then( function (newUser) {
            if(newUser){
                API.loginUser({email: data.email, password: data.password}).then( function (newToken) {
                    if (newToken) {
                        localStorage.setItem("token", newToken.token);
                        API.getProfile(newToken.token).then( function (profileData){
                            props.setProfileState({
                                name: profileData.username,
                                email: profileData.email,
                                token: newToken.token,
                                id: profileData.id,
                                isOwner: profileData.isOwner,
                                isLoggedIn: true,
                                loginError: "",
                                signUpError: ""
                            });
                            //redirect to home page
                            localStorage.removeItem("LoginError");
                            localStorage.removeItem("SignUpError");
                            return history.push("/");

                        });
                    }
                });
            }
            else {
                // login failed
                props.setProfileState({
                    ...props.profile,
                    signUpError: "signup failed"
                });
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className="">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Name"
                                name="username"
                                value={signUpFormState.username}
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={signUpFormState.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={signUpFormState.password}
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="street"
                                label="Address"
                                id="street"
                                value={signUpFormState.street}
                                autoComplete="address"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="zip"
                                label="Zip Code"
                                type="number"
                                id="zip"
                                value={signUpFormState.zip}
                                autoComplete="zipcode"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="state"
                                label="State"
                                id="state"
                                autoComplete="state"
                                value={signUpFormState.state}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="city"
                                label="City"
                                id="city"
                                autoComplete="city"
                                value={signUpFormState.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                type="number"
                                id="phone"
                                value={signUpFormState.phone}
                                autoComplete="phone-number"
                                onChange={handleChange}
                            />
                        </Grid>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={signUpFormState.isOwner}
                                onChange={handleChange}
                                name="isOwner"
                            />
                            }
                            label={signUpFormState.isOwner === true ? "Owner" : "Buyer"}
                        />
                        {props.profile.signUpError !== ""
                        ? <p style={{ textAlign: "center", color: "red" }}> {props.profile.signUpError} </p>
                        : <p> </p>
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" className="helper-text">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
