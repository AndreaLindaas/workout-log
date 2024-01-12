import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./Excercises.scss";
import { getUser } from "../../lib/utils";

export default function Excercises() {
  const [excercises, setExcercises] = useState([]);
  const user = getUser();
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

  return (
    <>
      <div className="selectedUser">Hello {user.name}</div>

      <div>{seeExcercises()}</div>
    </>
  );
}
