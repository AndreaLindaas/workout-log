import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../lib/constants";
import "./RegisterPerformance.scss";
import { useEffect, useState } from "react";
import moment from "moment";
export default function RegisterPerformance() {
  const [excercisesSelect, setExcercicesSelect] = useState([]);
  const submitForm = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetch(`${BASE_URL}/excercises/`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setExcercicesSelect(result);
      });
  }, []);
  const selectExcercises = () => {
    return excercisesSelect.map((excercise) => {
      console.log("bla", excercise);
      return (
        <MenuItem value={excercise.id} key={excercise.id}>
          {excercise.name}
        </MenuItem>
      );
    });
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <FormControl className="form">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="filled"
            name="Excercise"
          >
            {selectExcercises()}
          </Select>
          <FormHelperText id="filled-weight-helper-text">
            Excercise
          </FormHelperText>
        </FormControl>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              name="weight"
              id="filled-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="filled-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              name="reps"
              id="filled-adornment-weight"
              endAdornment={<InputAdornment position="end"> </InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                "aria-label": "Reps",
              }}
            />
            <FormHelperText id="filled-weight-helper-text">Reps</FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              name="sets"
              id="filled-adornment-weight"
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                "aria-label": "sets",
              }}
            />
            <FormHelperText id="filled-weight-helper-text">Sets</FormHelperText>
          </FormControl>
        </div>

        <div>
          <DatePicker
            defaultValue={moment()}
            required
            className="form"
            format="DD.MM.YYYY"
            disableFuture
          />
        </div>

        <Button type="submit" variant="contained" className="button">
          Save
        </Button>
      </form>
    </>
  );
}
