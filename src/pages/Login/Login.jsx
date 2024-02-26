import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Login.scss";

export default function Login() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const submitLoginForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = event.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(emailValue, passwordValue);

      if (authData.token) {
        navigate("/dashboard");
      }
    } catch (error) {
      setShowError(true);

      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <Helmet>
        <title>Workout-log - Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={submitLoginForm}>
          <div>
            <FormControl variant="filled" className="form">
              <TextField
                className="input-form"
                name="email"
                type="email"
                autoComplete="on"
                id="filled-adornment-weight"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  "aria-label": "email",
                }}
              />

              <FormHelperText
                id="filled-weight-helper-text"
                className="helper-text"
              >
                Email
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl variant="filled" className="form">
              <TextField
                className="input-form"
                name="password"
                type="password"
                autoComplete="on"
                id="filled-adornment-weight"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  "aria-label": "password",
                }}
              />
              <FormHelperText
                id="filled-weight-helper-text"
                className="helper-text"
              >
                Password
              </FormHelperText>
            </FormControl>
          </div>
          {showError && (
            <div className="center error">
              Something went wrong with login. Please try again.
            </div>
          )}
          {!isLoading && (
            <Button type="submit" variant="contained" className="button">
              Login
            </Button>
          )}
          {isLoading && <CircularProgress />}
        </form>
      </div>
    </div>
  );
}
