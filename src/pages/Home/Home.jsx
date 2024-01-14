import { useEffect } from "react";

import "./Home.scss";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Welcome to your new excercise log</h1>
      <div>
        Keeping track of your workouts is a powerful tool on your fitness
        journey.
      </div>
      <ol>
        <li>
          Record Your Workouts: Log each exercise, the number of sets and reps.
        </li>
        <li>Track Your Progress.</li>
        <li>
          Stay Consistent: Consistency is key! Make a habit of updating your
          exercise log regularly to stay on top of your fitness game.
        </li>
      </ol>
      <div>Go to you dashboard</div>
      <div>Not a member? Make an account here!</div>
    </>
  );
}
