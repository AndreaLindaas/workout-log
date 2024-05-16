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
        <Card
          key={excercice.id}
          sx={{ maxWidth: 345 }}
          className="muiCard excercises-card"
        >
          <Link to={`/excercise/${excercice.id}`}>
            <CardMedia
              sx={{ height: 140 }}
              image={
                excercice.picture
                  ? `https://trening.pockethost.io/api/files/excercises/${excercice.id}/${excercice.picture}?thumb=350x150`
                  : "./assets/media/trening.jpg"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {excercice.name}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>Workout Log | Excercises</title>
        <meta
          name="description"
          content="Here you can see the 10 last excercises and dates"
        />
      </Helmet>
      <User />
      <div className="excercises">
        <h1 className="page-title">All excercises ({excercises.length})</h1>
        {isLoading && (
          <div className="center">
            <CircularProgress />
          </div>
        )}
        {!isLoading && <div className="excercises-list">{seeExcercises()}</div>}
      </div>
    </>
  );
}
