import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import User from "../../components/User/User";
// import PocketBase from "pocketbase";
import { useEffect } from "react";

export default function CreateExcercise() {
  // const pb = new PocketBase("https://trening.pockethost.io");
  const submitExcerciseForm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <User />
      <form onSubmit={submitExcerciseForm}>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              endAdornment={<InputAdornment position="end"> </InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                "aria-label": "Reps",
              }}
            />
            <FormHelperText id="filled-weight-helper-text">
              Excercise
            </FormHelperText>
          </FormControl>
        </div>
        <Button type="submit" variant="contained" className="button">
          Save
        </Button>
      </form>
    </>
  );
}
