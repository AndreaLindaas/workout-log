import { useEffect, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Video from "../../components/Video/Video";
import { isUserLoggedIn } from "../../lib/utils";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>Workout Log | Home</title>
        <meta name="description" content="Welcome to this workout-log" />
      </Helmet>
      {isDesktop && <Video />}
      <div className="container">
        <h1>Your new excercise log!</h1>
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
            <Button variant="contained">Sign up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
