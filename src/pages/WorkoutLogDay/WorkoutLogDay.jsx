import { useParams } from "react-router-dom";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import "./WorkoutLogDay.scss";
export default function WorkoutLogDay() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const params = useParams();
  const [performances, setPerformances] = useState([]);
  const showPerformancesOnDate = async () => {
    const dateT = params.date.replace("T", " ");
    console.log(dateT);

    const records = await pb.collection("performances").getFullList({
      expand: "excercise",
      filter: `date = '${dateT}'`,
    });
    setPerformances(records);
  };
  useEffect(() => {
    showPerformancesOnDate();
  }, []);
  const showData = () => {
    return performances.map((performance) => {
      console.log(performance);
      return (
        <li key={performance.id}>
          <span> {performance.expand.excercise.name}:</span>{" "}
          <span>{performance.kg} Kg</span>
          <span>{performance.reps} Reps</span>
          <span>{performance.sets} Set</span>
        </li>
      );
    });
  };
  return (
    <>
      <h1>{params.date}</h1>
      <ul className="card">{showData()}</ul>
    </>
  );
}
