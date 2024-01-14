import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./Excercises.scss";
import PocketBase from "pocketbase";

export default function Excercises() {
  const [excercises, setExcercises] = useState([]);
  const pb = new PocketBase("https://trening.pockethost.io");

  const fetchExcercises = async () => {
    const records = await pb.collection("excercises").getFullList({
      sort: "name",
    });
    setExcercises(records);
  };

  useEffect(() => {
    fetchExcercises();
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
      <div>{seeExcercises()}</div>
    </>
  );
}
