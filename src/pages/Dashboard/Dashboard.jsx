import "./Dashboard.scss";
import { useEffect, useState } from "react";
import User from "../../components/User/User";
import PocketBase from "pocketbase";
import moment from "moment";
export default function Dashboard() {
  const [performances, setPerformances] = useState([]);
  const pb = new PocketBase("https://trening.pockethost.io");

  const seePerformances = async () => {
    const records = await pb.collection("performances").getList(1, 10, {
      sort: "-date",
      expand: "excercise",
    });
    setPerformances(records.items);
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
      <User />
      <p className="bold center">Last Excercises</p>
      <ul className="card">{showPerformances()}</ul>
      <p className="bold center">Last Performances</p>
      <ul className="card">{showPerformanceDates()}</ul>
    </>
  );
}
