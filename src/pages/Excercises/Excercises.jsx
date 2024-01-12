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
        setExcercises(result);
      });
  }, []);
  const seeExcercises = () => {
    return excercises.map((excercice) => {
      return (
        <Card key={excercice.id} sx={{ maxWidth: 345 }} className="muiCard">
          <CardMedia sx={{ height: 140 }} image="./assets/media/trening.jpg" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {excercice.name}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };
  //   const getUser = () => {
  //     let user = localStorage.getItem("user");

  //     // if (user) {
  //     //   return JSON.parse(user);
  //     // }
  //     // return null;
  //   };
  return (
    <>
      <div className="selectedUser">Hello </div>

      <div>{seeExcercises()}</div>
    </>
  );
}
