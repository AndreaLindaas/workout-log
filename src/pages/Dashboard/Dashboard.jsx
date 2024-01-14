import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import User from "../../components/User/User";
export default function Dashboard() {
  const [performances, setPerformances] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // fetch(`${BASE_URL}/performances/?userId=${params.id}&max=10`)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setPerformances(result);
    //   });
  }, []);

  useEffect(() => {
    // fetch(`${BASE_URL}/performances/dates/?userId=${params.id}`)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setDates(result);
    //   });
  }, []);

  const excercises = () => {
    return performances.map((performance) => {
      return (
        <li key={performance.id}>
          <span>{performance.excerciseName}</span>
          <span>{performance.kg} kg</span>
        </li>
      );
    });
  };
  const excerciseDate = () => {
    return dates.map((date, i) => {
      return <li key={date.id || i}>{date.date}</li>;
    });
  };
  return (
    <>
      <User />
      <p className="bold center">Siste 10 øvelser</p>
      <ul className="card">{excercises()}</ul>
      <p className="bold center">Siste treningsøkter</p>
      <ul className="card">{excerciseDate()}</ul>
    </>
  );
}
