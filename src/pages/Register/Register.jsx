import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { Helmet } from "react-helmet";

export default function Register() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const data = {
      email: emailValue,
      password: passwordValue,
      passwordConfirm: confirmPasswordValue,
      name: nameValue,
    };
    try {
      await pb.collection("users").create(data);
      navigate("/login");
    } catch (error) {
      setShowError(true);

      setButtonDisabled(false);
    }
  };
  const nameChanged = (event) => {
    setNameValue(event.target.value);
  };
  const emailChanged = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordChanged = (event) => {
    setPasswordValue(event.target.value);
    if (event.target.value.length > 7) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  const passwordConfirmChanged = (event) => {
    setConfirmPasswordValue(event.target.value);
    if (event.target.value.length > 10) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (nameValue.length < 2) {
      setButtonDisabled(true);
      return;
    }
    if (emailValue.length < 5) {
      setButtonDisabled(true);
      return;
    }
    if (passwordValue.length < 8) {
      setButtonDisabled(true);
      return;
    }
    if (confirmPasswordValue !== passwordValue) {
      setButtonDisabled(true);
      return;
    }
    setButtonDisabled(false);
  }, [nameValue, emailValue, passwordValue, confirmPasswordValue]);

  return (
    <div className="fullscreenBackground weights">
      <Helmet>
        <title>Workout Log | Register user</title>
        <meta name="description" content="Here you can register your user" />
      </Helmet>
      <div className="content">
        <h1>Sign up for WorkoutLog</h1>
        <form onSubmit={submitRegisterForm}>
          <div>
            <FormControl variant="filled" className="form">
              <FilledInput
                name="name"
                value={nameValue}
                type="text"
                autoComplete="on"
                onChange={nameChanged}
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  "aria-label": "name",
                }}
              />
              <FormHelperText id="filled-weight-helper-text">
                Name{" "}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl variant="filled" className="form">
              <FilledInput
                name="email"
                value={emailValue}
                onChange={emailChanged}
                type="email"
                autoComplete="on"
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
                value={passwordValue}
                onChange={passwordChanged}
                type="password"
                autoComplete="on"
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
          <div>
            <FormControl variant="filled" className="form">
              <FilledInput
                name="confirmPassword"
                value={confirmPasswordValue}
                onChange={passwordConfirmChanged}
                type="password"
                autoComplete="on"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  "aria-label": "confirm-password",
                }}
              />
              <FormHelperText id="filled-weight-helper-text">
                Confirm password
              </FormHelperText>
            </FormControl>
          </div>
          {showError && (
            <div className="center error">
              Something went wrong when registering user. Please try again.
            </div>
          )}

          <Button
            disabled={buttonDisabled}
            type="submit"
            variant="contained"
            className="button registerButton"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
