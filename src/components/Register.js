import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


import LoginImg from '../assets/register.png'
import Banner from '../assets/header.png'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: "#0C8A36",
        padding: "0.5em",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
    },
}));

export default function Login({ returnLogedIn, returnJsonToken, returnUserId, returnUsername, returnPassword, returnEmail, returnDate, returnRegister }) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState('');

    const [displayProgress, setDisplayProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const verifyInput = () => {
        if (username === '') {
            setUsernameError(true);
        }

        if (password === '') {
            setPasswordError(true);
        }

        if (email === '') {
            setEmailError(true);
        }

        if (username !== '' && password !== '' && email !== '') {
            setDisplayProgress(true);
            tryToRegister();
        }
    }

    async function tryToRegister() {
        try {
            let response = await fetch('https://afternoon-depths-99413.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                }),
            });
            let responseStatus = await response.status;

            if (responseStatus === 200) {
                setDisplayProgress(false);
                returnRegister(false);
            }
            else if (responseStatus === 304) {
                setDisplayProgress(false);
                setUsername('');
                setPassword('');
                setEmail('');
                setUsernameError(true);
                setPasswordError(true);
                setAlertText("Korisnik već postoji");
                setAlertOpen(true);
            }
            else {
                setUsername('');
                setPassword('');
                setEmail('');
                setDisplayProgress(false);

                setAlertText("Nešto je pošlo po zlu");
                setAlertOpen(true);
            }
        } catch (er) {
            setDisplayProgress(false);

            setAlertText("Ode mast u propast");
            setAlertOpen(true);
            console.error(er);
        }
    }

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1000;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    function layout() {
        if (width < breakpoint) {
            return (
                <div>
                    <div style={{
                        display: 'flex', height: "8em", width: "100%", backgroundColor: "#FFF", backgroundImage: `url(${Banner})`, backgroundPosition: 'center left',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', margin: 0
                    }}></div>
                    <div style={{ flex: 1 }}></div>
                    <div className={classes.paper}>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ flex: 3, background: "rgba(255, 255, 255, 0.7)", padding: 20, borderRadius: 25 }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                paddingTop: "1em",
                                paddingBottom: "1em",
                            }}>
                                <div style={{ flex: 3 }}></div>
                                <div style={{ flex: 1 }}>
                                    <img alt="" src={LoginImg} style={{
                                        width: '100 %',
                                        maxWidth: '200px',
                                        height: 'auto'
                                    }} />
                                </div>
                                <div style={{ flex: 3 }}></div>
                            </div>
                            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                                Registracija
                    </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                error={emailError}
                                value={email}
                                color="secondary"
                                onChange={(event) => { setEmail(event.target.value); setEmailError(false) }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Korisničko ime"
                                name="username"
                                autoComplete="username"
                                error={usernameError}
                                value={username}
                                color="secondary"
                                onChange={(event) => { setUsername(event.target.value); setUsernameError(false) }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Lozinka"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                value={password}
                                color="secondary"
                                onChange={(event) => { setPassword(event.target.value); setPasswordError(false) }}
                            />

                            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    {alertText}
                                </Alert>
                            </Snackbar>

                            <div style={{
                                flexDirection: "column",
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                {displayProgress ? <CircularProgress variant="determinate" value={progress} style={{ marginBottom: "1em" }} /> : <CircularProgress variant="determinate" value={0} style={{ marginBottom: "1em" }} />}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#C4D0FD",
                                        color: "white",
                                        width: "60%"
                                    }}
                                    className={classes.submit}
                                    onClick={
                                        () => {
                                            verifyInput();
                                        }
                                    }
                                >
                                    Izradi račun
                        </Button>
                            </div>
                            <div style={{ paddingTop: "2em", paddingBottom: "2em", textAlign: "center" }}>
                                <Link href="#" onClick={() => returnRegister(false)} variant="body2" style={{ color: '#0000EE' }}>
                                    {"Vrati me na prijavu"}
                                </Link>
                            </div>
                        </div>
                        <div style={{ flex: 2 }}></div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div >
            )
        } else {
            return (
                <div>
                    <div style={{
                        display: 'flex', height: "8em", width: "100%", backgroundColor: "#FFF", backgroundImage: `url(${Banner})`, backgroundPosition: 'center bottom',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', margin: 0
                    }}></div>
                    <div style={{ flex: 1 }}></div>
                    <div className={classes.paper}>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ flex: 3, background: "rgba(255, 255, 255, 0.7)", padding: 20, borderRadius: 25 }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                paddingTop: "1em",
                                paddingBottom: "1em",
                            }}>
                                <div style={{ flex: 3 }}></div>
                                <div style={{ flex: 1 }}>
                                    <img alt="" src={LoginImg} />
                                </div>
                                <div style={{ flex: 3 }}></div>
                            </div>
                            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                                Registracija
                        </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                error={emailError}
                                value={email}
                                color="secondary"
                                onChange={(event) => { setEmail(event.target.value); setEmailError(false) }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Korisničko ime"
                                name="username"
                                autoComplete="username"
                                error={usernameError}
                                value={username}
                                color="secondary"
                                onChange={(event) => { setUsername(event.target.value); setUsernameError(false) }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Lozinka"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                value={password}
                                color="secondary"
                                onChange={(event) => { setPassword(event.target.value); setPasswordError(false) }}
                            />

                            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    {alertText}
                                </Alert>
                            </Snackbar>

                            <div style={{
                                flexDirection: "column",
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                {displayProgress ? <CircularProgress variant="determinate" value={progress} style={{ marginBottom: "1em" }} /> : <CircularProgress variant="determinate" value={0} style={{ marginBottom: "1em" }} />}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#C4D0FD",
                                        color: "white",
                                        width: "60%"
                                    }}
                                    className={classes.submit}
                                    onClick={
                                        () => {
                                            verifyInput();
                                        }
                                    }
                                >
                                    Izradi račun
                            </Button>
                            </div>
                            <div style={{ paddingTop: "2em", paddingBottom: "2em", textAlign: "center" }}>
                                <Link href="#" onClick={() => returnRegister(false)} variant="body2" style={{ color: '#0000EE' }}>
                                    {"Vrati me na prijavu"}
                                </Link>
                            </div>
                        </div>
                        <div style={{ flex: 2 }}></div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div >
            )
        }
    }

    return (
        <div>
            {layout()}
        </div>
    );
}