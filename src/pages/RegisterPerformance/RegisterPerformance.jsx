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
import { getUser } from "../../lib/utils";
export default function RegisterPerformance() {
  const [excercisesSelect, setExcercicesSelect] = useState([]);
  const [selectedExcercise, setSelectedExcercise] = useState(0);
  const [datePreview, setDatePreview] = useState(moment());

  const submitForm = (event) => {
    event.preventDefault();
    const { weight, reps, sets } = event.target.elements;
    const weightResult = weight.value;
    const repsResult = reps.value;
    const setsResult = sets.value;
    const date = moment(datePreview).valueOf() / 1000;
    const user = getUser();

    fetch(`${BASE_URL}/performances/performance/addPerformance/?userId=${user.id}&excerciseId=${selectedExcercise}&kg=${weightResult}&reps=${repsResult}&sets=${setsResult}&date=${date}
    `)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    fetch(`${BASE_URL}/excercises/`)
      .then((response) => response.json())
      .then((result) => {
        setExcercicesSelect(result);
      });
  }, []);
  const selectExcercises = () => {
    return excercisesSelect.map((excercise) => {
      return (
        <MenuItem value={excercise.id} key={excercise.id}>
          {excercise.name}
        </MenuItem>
      );
    });
  };

  const excerciseSelected = (event) => {
    setSelectedExcercise(event.target.value);
  };
  const dateDescription = (date) => {
    setDatePreview(date);
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <FormControl className="form">
          <Select
            onChange={excerciseSelected}
            value={selectedExcercise}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="filled"
            name="excercise"
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
            value={datePreview}
            required
            className="form"
            format="DD.MM.YYYY"
            disableFuture
            onChange={dateDescription}
          />
        </div>

        <Button type="submit" variant="contained" className="button">
          Save
        </Button>
      </form>
    </>
  );
}
