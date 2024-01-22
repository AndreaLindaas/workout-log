import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import User from "../../components/User/User";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

export default function WorkoutLog() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    const records = await pb.collection("performances").getFullList({
      sort: "-date",
    });
    setPerformances(records);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchList();
  }, []);
  const showPerformanceDates = () => {
    const uniqueDates = Array.from(
      new Set(performances.map((p) => moment(p.date).toISOString()))
    );
    return uniqueDates.map((date, i) => {
      return (
        <>
          <Link to={`/workout-log/${date}`}>
            <li key={i}>
              {moment(date).format("dddd DD.MM.YYYY").toLocaleString()}{" "}
              <ArrowForwardIcon />
            </li>
          </Link>
        </>
      );
    });
  };
  return (
    <>
      <Helmet>
        <title>Workout-log - Workoutlog</title>
        <meta
          name="description"
          content="Here you can see all your performances"
        />
      </Helmet>
      <User />

      {performances.length > 0 && (
        <>
          <ul className="card">{showPerformanceDates()}</ul>
        </>
      )}

      {performances.length == 0 && !isLoading && (
        <p className="center"> You have not performed any excercises yet</p>
      )}
      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
