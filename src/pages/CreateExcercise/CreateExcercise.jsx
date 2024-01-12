import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import User from "../../components/User/User";
export default function CreateExcercise() {
  return (
    <>
      <User />
      <form action="">
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              id="filled-adornment-weight"
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
        <Button variant="contained" className="button">
          Save
        </Button>
      </form>
    </>
  );
}
