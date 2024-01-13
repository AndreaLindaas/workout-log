import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import PocketBase from "pocketbase";
export default function Register() {
  const pb = new PocketBase("https://trening.pockethost.io");

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = event.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;
    const nameValue = name.value;
    const passwordConfirmValue = confirmPassword.value;

    const data = {
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
      name: nameValue,
    };
    const record = await pb.collection("users").create(data);
    console.log(record);
  };
  return (
    <form onSubmit={submitRegisterForm}>
      <div>
        <FormControl variant="filled" className="form">
          <FilledInput
            name="name"
            type="text"
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
      <Button type="submit" variant="contained" className="button">
        Register
      </Button>
    </form>
  );
}
