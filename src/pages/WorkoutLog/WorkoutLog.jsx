import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
export default function WorkoutLog() {
  const pb = new PocketBase("https://trening.pockethost.io");
  const [performances, setPerformances] = useState([]);
  const fetchList = async () => {
    const records = await pb.collection("performances").getFullList({
      sort: "date",
    });
    setPerformances(records);
  };
  useEffect(() => {
    fetchList();
  }, []);
  const showPerformanceDates = () => {
    const uniqueDates = Array.from(
      new Set(
        performances.map((p) =>
          moment(p.date).format("DD.MM.YYYY").toLocaleString()
        )
      )
    );

    return uniqueDates.map((date, i) => {
      return (
        <>
          <Link to="/workout-log/:date">
            <li key={i}>
              {date} <ArrowForwardIcon />
            </li>
          </Link>
        </>
      );
    });
  };
  return (
    <>
      <ul className="card">{showPerformanceDates()}</ul>
    </>
  );
}
