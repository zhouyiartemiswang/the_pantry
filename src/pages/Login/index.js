import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../utils/API';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    let history = useHistory();

    const [loginFormState, setLoginFormState] = useState({
        email: "",
        password: ""
    })

    useEffect(fetchUserData, [])

    function fetchUserData() {
        const token = localStorage.getItem("token");
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setLoginFormState({
            ...loginFormState,
            [name]: value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(event.target);
        API.loginUser(loginFormState)
            .then(res => {
                console.log(res.token);
                localStorage.setItem("token", res.token)
                API.getOneUser(res.id)
                    .then(res => {
                        console.log(res)
                        if (res.isOwner) {
                            console.log(res.isOwner)
                            // history.push("/profile")
                        } else {
                            console.log(res.isOwner)
                            // history.push("/profile")
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleFormSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={loginFormState.email}
                        onChange={handleInputChange}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        value={loginFormState.password}
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
