import { useParams, Link } from "react-router-dom";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import User from "../../components/User/User";
import { Helmet } from "react-helmet";
import moment from "moment";
import { CircularProgress } from "@mui/material";

export default function WorkoutLogDay() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const params = useParams();
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const showPerformancesOnDate = async () => {
    const dateT = params.date.replace("T", " ");

    const records = await pb.collection("performances").getFullList({
      expand: "excercise",
      filter: `date = '${dateT}'`,
    });
    setPerformances(records);
    setIsLoading(false);
  };
  useEffect(() => {
    showPerformancesOnDate();
  }, []);
  const showData = () => {
    return performances.map((performance) => {
      return (
        <Link
          key={performance.id}
          to={`/excercise/${performance.expand.excercise.id}`}
        >
          <li>
            <span className="center"> {performance.expand.excercise.name}</span>
            <span className="values">
              <span>{performance.kg} Kg</span>
              <span>{performance.reps} Reps</span>
              <span>{performance.sets} Set</span>
            </span>
          </li>
        </Link>
      );
    });
  };
  return (
    <>
      <Helmet>
        <title>Workout-log - WorkoutlogDay</title>
        <meta
          name="description"
          content="Here you can see all your excercises for one day"
        />
      </Helmet>
      <User />
      <h1>{moment(params.date).format("dddd DD.MM.YYYY").toLocaleString()}</h1>
      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {!isLoading && <ul className="performances">{showData()}</ul>}
    </>
  );
}
