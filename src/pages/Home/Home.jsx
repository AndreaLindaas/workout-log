import { useEffect } from "react";
import { Button } from "@mui/material";
import "./Home.scss";
import { Link } from "react-router-dom";
Link;
export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <h1>Welcome to your new excercise log</h1>
        <div>
          Keeping track of your workouts is a powerful tool on your fitness
          journey.
        </div>
        <ol>
          <li>
            Record Your Workouts: Log each exercise, the number of sets and
            reps.
          </li>
          <li>Track Your Progress.</li>
          <li>
            Stay Consistent: Consistency is key! Make a habit of updating your
            exercise log regularly to stay on top of your fitness game.
          </li>
        </ol>
        <div className="center">
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained">Register</Button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
