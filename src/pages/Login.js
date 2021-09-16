import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { postAPI } from "../services/axios/post";
import { useSelector, useDispatch } from "react-redux";
import { setAlert, setSession } from "../store/actions/globalAction";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const alert = useSelector((state) => state.main.alert);
  const dispatch = useDispatch();
  const history = useHistory();

  const [admin, setAdmin] = useState({ email: "", password: "" });

  const data = {
    email: admin.email,
    password: admin.password,
  };

  async function login() {
    try {
      const res = await postAPI("/admin/login", data);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", JSON.stringify(res.data.result.token));
      //   console.log(res.data);
      dispatch(
        setAlert({
          isOpen: true,
          severity: "success",
          message: "Berhasil login! Redirect ke dashboard admin...",
        })
      );
      setTimeout(() => {
        dispatch(
          setAlert({
            isOpen: false,
            severity: "",
            message: "",
          })
        );
        history.push("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isOpen: true,
          severity: "error",
          message: "Email atau password salah",
        })
      );
      setTimeout(() => {
        dispatch(
          setAlert({
            isOpen: false,
            severity: "",
            message: "",
          })
        );
      }, 3000);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin.email, admin.password);
    login();
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            {alert.isOpen && (
              <Alert
                variant="filled"
                severity={alert.severity}
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {alert.message}
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  email: e.target.value,
                })
              }
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
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  password: e.target.value,
                })
              }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Grid container>
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
            </Grid> */}
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
