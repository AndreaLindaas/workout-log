import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import PocketBase from "pocketbase";
export default function Login() {
  const pb = new PocketBase("https://trening.pockethost.io");

  const submitLoginForm = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;

    const authData = await pb
      .collection("users")
      .authWithPassword(emailValue, passwordValue);

    console.log(pb.authStore);
  };
  return (
    <form onSubmit={submitLoginForm}>
      <div>
        <FormControl variant="filled" className="form">
          <FilledInput
            name="email"
            type="email"
            id="filled-adornment-weight"
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
      <Button type="submit" variant="contained" className="button">
        Login
      </Button>
    </form>
  );
}
