import { useParams, Link } from "react-router-dom";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import moment from "moment";
import "./Excercise.scss";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import AreaChart from "../../components/AreaChart/AreaChart";

export default function Excercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [performances, setPerformances] = useState([]);
  const [excercise, setExcercise] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chartXLabels, setChartXLabels] = useState([]);
  const params = useParams();

  const pb = new PocketBase("https://trening.pockethost.io");

  const renderDate = (date) => {
    return moment(date).format("DD.MM.YYYY").toLocaleString();
  };

  const getExcercise = async () => {
    const record = await pb.collection("excercises").getOne(`${params.id}`);
    setExcercise(record);
  };

  const showExcercise = async () => {
    const record = await pb.collection("performances").getFullList({
      expand: "excercise",
      filter: `excercise = '${params.id}'`,
    });
    setPerformances(record);
    generateChartData(record);
    setIsLoading(false);
  };

  const generateChartData = (record) => {
    const data = record.map((p) => p.kg);
    const labels = record.map((p) => renderDate(p.date));

    setChartData(data);
    setChartXLabels(labels);
  };

  useEffect(() => {
    getExcercise();
    showExcercise();
  }, []);

  const showPerformances = () => {
    return performances.map((performance) => {
      return (
        <Link key={performance.id} to={`/workout-log/${performance.date}`}>
          <li>
            <span>{renderDate(performance.date)}</span>
            <span className="values">
              <span>{performance.kg} Kg</span>
              <span>{performance.reps} Reps</span>
              <span>{performance.sets} Sets</span>
            </span>
          </li>
        </Link>
      );
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Helmet>
        <title>Workout Log | Excercise</title>
        <meta name="description" content="Here you can see one excercise" />
      </Helmet>
      <h1>{excercise.name}</h1>

      <div className="chart-container">
        <AreaChart
          data={chartData}
          title={excercise.name}
          xLabels={chartXLabels}
        />
      </div>
      {performances.length > 0 && (
        <>
          <h2 className="center">Log</h2>
          <p className="center subtitle">
            Click on a performance to see the whole workout for that particular
            day.
          </p>
          <ul className="performances">{showPerformances()}</ul>
        </>
      )}

      {performances.length === 0 && (
        <p className="center">You have not practiced this exercise yet</p>
      )}
    </>
  );
}
