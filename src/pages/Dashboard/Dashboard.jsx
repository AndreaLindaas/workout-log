import "./Dashboard.scss";
import { useEffect, useState } from "react";
import User from "../../components/User/User";
import PocketBase from "pocketbase";
import moment from "moment";
export default function Dashboard() {
  const [performances, setPerformances] = useState([]);
  const pb = new PocketBase("https://trening.pockethost.io");

  const seePerformances = async () => {
    // const records = await pb.collection("performances").getList(1, 10, {
    //   sort: "-created",
    //   expand: "excercise",
    // });
    const records = await pb.collection("performances").getFullList({
      sort: "-created",
      expand: "excercise",
    });
    console.log(records);
    setPerformances(records);
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
    return performances.map((date, i) => {
      return (
        <li key={date.id || i}>
          {moment(date.date).format("DD.MM.YYYY").toLocaleString()}
        </li>
      );
    });
  };
  return (
    <>
      <User />
      <p className="bold center">Last Excercises</p>
      <ul className="card">{showPerformances()}</ul>
      <p className="bold center">Last Performances</p>
      <ul className="card">{showPerformanceDates()}</ul>
    </>
  );
}
