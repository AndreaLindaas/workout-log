import { useParams } from "react-router-dom";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import "./WorkoutLogDay.scss";
import User from "../../components/User/User";
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
          <span className="center"> {performance.expand.excercise.name}:</span>
          <span className="values">
            <span>{performance.kg} Kg</span>
            <span>{performance.reps} Reps</span>
            <span>{performance.sets} Set</span>
          </span>
        </li>
      );
    });
  };
  return (
    <>
      <User />
      <h1>{params.date}</h1>
      <ul className="performances">{showData()}</ul>
    </>
  );
}
