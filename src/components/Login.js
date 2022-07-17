import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { useQuery } from '@apollo/client';
import { GET_DRIVER_AUTH } from '../queries/GET_DRIVER_AUTH';
import { GET_RIDER_AUTH } from '../queries/GET_RIDER_AUTH';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Uber Rides
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [type, setType] = useState('rider');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(type === 'driver' ? GET_DRIVER_AUTH : GET_RIDER_AUTH);
    // console.log(data)
    if(error)  Sentry.captureException(error);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (type === 'driver') {
            let userdata = data?.driver?.find((e) => e.drivername === name);
            // console.log(userdata);
            if (userdata?.password === password) navigate(`/driver/${userdata.driverid}`)
            else alert("invalid username or password");
        }
        else {
            let userdata = data?.rider?.find((e) => e.ridername === name);
            // console.log(userdata);
            if (userdata?.password === password) navigate(`/rider/${userdata.riderid}`)
            else alert("invalid username or password");
        }
        // console.log(valid, data);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField variant="outlined"
                        required
                        fullWidth
                        name="type"
                        autoComplete="type"
                        id="type"
                        label="Signin as"
                        value={type}
                        onChange={(e) => setType(e.target.value)} select>
                        <MenuItem value="rider">Rider</MenuItem>
                        <MenuItem value="driver">Driver</MenuItem>
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}