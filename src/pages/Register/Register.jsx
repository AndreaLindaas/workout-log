import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
export default function Register() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nameValue, setNameValue] = useState("");

  const [emailValue, setEmailValue] = useState("");

  const [passwordValue, setPasswordValue] = useState("");

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  // const regexEmail =
  //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    console.log("kkkkkkkkkkk");
    setButtonDisabled(true);

    // const { name, email, password, confirmPassword } = event.target.elements;
    // const emailValue = email.value;
    // const passwordValue = password.value;
    // const nameValue = name.value;
    // const passwordConfirmValue = confirmPassword.value;

    const data = {
      email: emailValue,
      password: passwordValue,
      passwordConfirm: confirmPasswordValue,
      name: nameValue,
    };
    try {
      const record = await pb.collection("users").create(data);
      console.log(record);
    } catch (error) {
      console.log(error);
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
    setButtonDisabled(false);
  }, [nameValue, emailValue]);

  return (
    <form onSubmit={submitRegisterForm}>
      <div>
        <FormControl variant="filled" className="form">
          <FilledInput
            name="name"
            value={nameValue}
            type="text"
            onChange={nameChanged}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              "aria-label": "name",
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Name </FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" className="form">
          <FilledInput
            name="email"
            value={emailValue}
            onChange={emailChanged}
            type="email"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              "aria-label": "email",
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Email</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" className="form">
          <FilledInput
            name="password"
            value={passwordValue}
            onChange={passwordChanged}
            type="password"
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
      <Button
        disabled={buttonDisabled}
        type="submit"
        variant="contained"
        className="button"
      >
        Register
      </Button>
    </form>
  );
}
