import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../lib/constants";
import "./RegisterPerformance.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { getUser } from "../../lib/utils";
import User from "../../components/User/User";
import PocketBase from "pocketbase";

export default function RegisterPerformance() {
  const [excercises, setExcercices] = useState([]);
  const [selectedExcercise, setSelectedExcercise] = useState();
  const [datePreview, setDatePreview] = useState(moment());
  const pb = new PocketBase("https://trening.pockethost.io");
  const submitForm = async (event) => {
    event.preventDefault();
    const { weight, reps, sets } = event.target.elements;
    const weightResult = weight.value;
    const repsResult = reps.value;
    const setsResult = sets.value;
    const date = moment(datePreview).valueOf() / 1000;

    const data = {
      excerciseId: selectedExcercise,

      kg: weightResult,
      reps: repsResult,
      sets: setsResult,
      date: date,
    };
    const record = await pb.collection("performances").create(data);
    console.log(record);
  };
  const fetchExcercises = async () => {
    const records = await pb.collection("excercises").getFullList({
      sort: "name",
    });
    setExcercices(records);
    setSelectedExcercise(records[0].id);
  };
  useEffect(() => {
    fetchExcercises();
  }, []);
  const selectExcercises = () => {
    return excercises.map((excercise) => {
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

  if (excercises.length === 0) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <>
      <User />
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
