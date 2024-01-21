import "./Dashboard.scss";
import { useEffect, useState } from "react";
import User from "../../components/User/User";
import PocketBase from "pocketbase";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pb = new PocketBase("https://trening.pockethost.io");

  const seePerformances = async () => {
    const records = await pb.collection("performances").getList(1, 10, {
      sort: "-date",
      expand: "excercise",
    });
    setPerformances(records.items);
    setIsLoading(false);
  };
  useEffect(() => {
    seePerformances();
  }, []);

  const showPerformances = () => {
    return performances.map((performance) => {
      return (
        <li key={performance.id}>
          <span>{performance.expand.excercise.name}</span>
          <span>{performance.kg} kg</span>
        </li>
      );
    });
  };

  const showPerformanceDates = () => {
    const uniqueDates = Array.from(
      new Set(
        performances.map((p) =>
          moment(p.date).format("DD.MM.YYYY").toLocaleString()
        )
      )
    );

    return uniqueDates.map((date, i) => {
      return <li key={i}>{date}</li>;
    });
  };
  return (
    <>
      <Helmet>
        <title>Workout-log - Dashboard</title>
        <meta
          name="description"
          content="Here you can see 10 last excercises and dates"
        />
      </Helmet>
      <User />

      {performances.length > 0 && (
        <>
          <p className="bold center">Last Excercises</p>
          <ul className="card">{showPerformances()}</ul>
          <p className="bold center">Last Performances</p>
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
