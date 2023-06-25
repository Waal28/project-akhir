import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DirectionsBus } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "./logo1.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonGoogle from "../../3.buttonGoogle";
import { useLocalStorage } from "../../5.hooks/localStorage";
import { Fade } from "@mui/material";

const users = [
  {
    username: "iwal",
    password: "123456",
  },
  {
    username: "husna",
    password: "123456",
  },
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Buszilla
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [, setLoginAlert] = useLocalStorage("loginAlert");
  const [credential] = useLocalStorage("credential");
  const [usernameStorage, setUsernameStorage] = useLocalStorage("username");

  const { color1 } = useSelector((state) => state.comp);
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkError, setcheckError] = React.useState(false);

  const userData = users.find((user) => user.username === username);
  const checkUsername =
    typeof userData !== "undefined" ? username === userData.username : false;
  const checkPassword =
    typeof userData !== "undefined" ? password === userData.password : false;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkUsername && checkPassword) {
      setLoginAlert(true);
      navigate("/");
      console.log("Anda berhasil login");
      setUsernameStorage(userData.username);
    } else {
      console.log("Login gagal");
      setcheckError(checkUsername && checkPassword ? false : true);
    }
  };

  React.useEffect(() => {
    if (credential || usernameStorage) {
      navigate("/");
    }
  }, [credential, usernameStorage, navigate]);
  React.useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: color1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={open} mountOnEnter unmountOnExit timeout={1000}>
            <img src={logo} alt="Buszilla" width="100%" />
          </Fade>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: color1 }}>
              <DirectionsBus sx={{ color: "yellow" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={checkError}
                helperText={checkError ? "Wrong password/username!" : null}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                error={checkError}
                helperText={checkError ? "Wrong password/username!" : null}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Sign In
              </Button>
              <Grid container alignItems="center" justifyContent="center">
                <ButtonGoogle />
              </Grid>
              <Grid container sx={{ mt: 2 }}>
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
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
