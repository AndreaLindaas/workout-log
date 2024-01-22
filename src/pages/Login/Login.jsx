import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Workout-log - Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <form onSubmit={submitLoginForm}>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
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
            <FormHelperText id="filled-weight-helper-text">
              Email
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
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
            <FormHelperText id="filled-weight-helper-text">
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
    </>
  );
}
