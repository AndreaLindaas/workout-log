import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
export default function Excercises() {
  const [excercises, setExcercises] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/excercises/`)
      .then((response) => response.json())
      .then((result) => {
        console.log("dfg", result);
        setExcercises(result);
      });
  }, []);
  const seeExcercises = () => {
    return excercises.map((excercice) => {
      return (
        <div key={excercice.id}>
          <span>{excercice.name}</span>
        </div>
      );
    });
  };

  return (
    <>
      <div>{seeExcercises()}</div>
    </>
  );
}
