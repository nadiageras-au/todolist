import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from "formik";
import {loginTC} from "../../state/auth_reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Navigate} from "react-router-dom";

type ErrorType = {
    email?: string
    password?: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Todolist by Nadia Geras
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Login() {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state)=> state.auth.isLoggedIn)

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: ErrorType = {};

            if (!values.email.length) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password.length) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    if(isLoggedIn) {
        return <Navigate to={'/todolists'}/>
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">

                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            // name="email"
                            autoComplete="email"
                            autoFocus
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{"color": "red"}}>{formik.errors.email}</div>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            // name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? <div style={{"color": "red"}}>{formik.errors.password}</div> : null}

                        <FormControlLabel
                            // control={<Checkbox value="remember" color="primary"
                            control={<Checkbox color="primary"
                                               {...formik.getFieldProps("rememberMe")}
                                               checked={formik.values.rememberMe}/>}
                            label="Remember me"

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>

            </Container>
        </ThemeProvider>
    );
}

