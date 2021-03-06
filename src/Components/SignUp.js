import React from "react";
import Avatar1 from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "react-avatar-edit";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backdropFilter: "grey"
  },
  avatar: {
    margin: theme.spacing(2),
    //backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
    display: "flex"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  av: {
    display: "flex"
  }
}));

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [preview, setPreview] = React.useState(null);
  const [values, setValues] = React.useState(false);
  const [values1, setValues1] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [responses, setResponses] = React.useState({ success: "", error: "" });

  const redirect = useHistory();

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = preview => {
    setPreview(preview);
    //console.log(preview);
  };

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 16800000) {
      alert("File is too big!");
      console.log(elem.target.files[0].name);
      elem.target.value = "";
    }
    console.log(elem.target.files[0]);
  };

  const handleClickShowPassword = () => {
    setValues(!values);
  };

  const handleClickShowConfirmPassword = () => {
    setValues1(!values1);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  const classes = useStyles();

  const onSignUp = e => {
    e.preventDefault();

    //const user = new FormData();
    //user.append("profileImage", preview);
    //user.append("username", username);
    //user.append("name", name);
    //user.append("password", confirmPassword);

    const user = {
      username: username,
      name: name,
      password: confirmPassword,
      profileImage: preview
    };

    confirmPassword !== password
      ? alert("The password does not match")
      : axios
          .post("http://localhost:4000/user/signup", user)
          .then(res => {
            console.log(res.data);
            setResponses({ success: res.data.message });
            setOpenSuccess(true);
            setTimeout(() => {
              redirect.push("/");
            }, 2000);
          })
          .catch(error => {
            console.log(error.message);
            setOpenFailure(true);
            setResponses({ error: error.message });
          });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>

        <Box mt={8}>
          <Typography component="p" variant="body1">
            choose a profile picture
          </Typography>
          <br />
          <Avatar
            width={200}
            height={200}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            label="choose a file"
          />
        </Box>

        <form onSubmit={onSignUp} className={classes.form} noValidate>
          <div className={classes.av}>
            <Avatar1 src={preview} alt="Preview" className={classes.avatar} />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoFocus
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="name"
            name="name"
            autoFocus
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />

          <FormControl className={classes.form} required variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              password
            </InputLabel>
            <OutlinedInput
              fullWidth
              required
              id="outlined-adornment-password"
              type={values ? "text" : "password"}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl className={classes.form} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              confirm password
            </InputLabel>
            <OutlinedInput
              fullWidth
              required
              id="outlined-adornment-password1"
              type={values1 ? "text" : "password"}
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={140}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SignIn
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/signin" variant="body2">
                login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
