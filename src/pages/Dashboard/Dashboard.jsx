import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";
export default function Dashboard() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/users/user/?id=${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setUser(result[0]);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/performances/?userId=${params.id}&max=10`)
      .then((response) => response.json())
      .then((result) => {
        setPerformances(result);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/performances/dates/?userId=${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("iujhijh", result);
        setDates(result);
      });
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
    return dates.map((date) => {
      return <li key={performance.id}>{date.date}</li>;
    });
  };
  return (
    <>
      <div className="selectedUser">Hello {user.name}</div>
      <p className="bold center">Siste 10 øvelser</p>
      <ul className="card">{excercises()}</ul>
      <p className="bold center">Siste treningsøkter</p>
      <ul className="card">{excerciseDate()}</ul>
    </>
  );
}
