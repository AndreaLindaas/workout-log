import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./Excercises.scss";
import PocketBase from "pocketbase";
import { Link } from "react-router-dom";
import User from "../../components/User/User";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

export default function Excercises() {
  const [excercises, setExcercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pb = new PocketBase("https://trening.pockethost.io");

  const fetchExcercises = async () => {
    const records = await pb.collection("excercises").getFullList({
      sort: "name",
    });
    setExcercises(records);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExcercises();
  }, []);

  const seeExcercises = () => {
    return excercises.map((excercice) => {
      return (
        <>
          <Card key={excercice.id} sx={{ maxWidth: 345 }} className="muiCard">
            <CardMedia
              sx={{ height: 140 }}
              image="./assets/media/trening.jpg"
            />
            <Link to={`/excercise/${excercice.id}`}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {excercice.name}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </>
      );
    });
  };
  if (isLoading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Workout-log - Excercises</title>
        <meta
          name="description"
          content="Here you can see the 10 last excercises and dates"
        />
      </Helmet>
      <User />
      <div>{seeExcercises()}</div>
    </>
  );
}
