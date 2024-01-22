import {
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import User from "../../components/User/User";
import PocketBase from "pocketbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function CreateExcercise() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [excerciseName, setExcerciseName] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const submitExcerciseForm = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const data = {
      name: excerciseName,
    };
    try {
      await pb.collection("excercises").create(data);
      navigate("/register-performance");
    } catch (error) {
      setShowError(true);

      setButtonDisabled(false);
    }
  };

  const nameChanged = (event) => {
    setExcerciseName(event.target.value);
    if (event.target.value.length > 1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Workout-log - Create excercise</title>
        <meta name="description" content="Here you can ceate an excercise" />
      </Helmet>
      <User />
      <form onSubmit={submitExcerciseForm}>
        <div>
          <FormControl variant="filled" className="form">
            <FilledInput
              name="excercise"
              value={excerciseName}
              onChange={nameChanged}
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
        {showError && (
          <div className="center error">
            Something went wrong when registering excercise. Please try again.
          </div>
        )}
        <Button
          disabled={buttonDisabled}
          type="submit"
          variant="contained"
          className="button"
        >
          Save
        </Button>
      </form>
    </>
  );
}
