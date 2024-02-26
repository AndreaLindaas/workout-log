import { useEffect, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import "./Home.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Video from "../../components/Video/Video";
export default function Home() {
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {}, []);

  return (
    <div className="home">
      <Helmet>
        <title>Workout-log - Home</title>
        <meta name="description" content="Welcome to this workout-log" />
      </Helmet>
      {isDesktop && <Video />}
      {/* <img src="/assets/media/weights.jpg" alt="" /> */}
      <div className="container">
        <h1>Your new excercise log</h1>
        <p>Use our powerfull tool to track your fitness journy:</p>
        <ul>
          <li>Record Your Workouts</li>
          <li>Track Your Progress</li>
          <li>Get inspired</li>
        </ul>
        <div className="center">
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained">Register</Button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
