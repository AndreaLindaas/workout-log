import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./Excercises.scss";
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
        <>
          <div key={excercice.id}>
            <span></span>
          </div>

          <Card sx={{ maxWidth: 345 }} className="muiCard">
            <CardMedia
              sx={{ height: 140 }}
              image="./assets/media/trening.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {excercice.name}
              </Typography>
            </CardContent>
          </Card>
        </>
      );
    });
  };

  return (
    <>
      <div>{seeExcercises()}</div>
    </>
  );
}
