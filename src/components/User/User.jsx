import { useEffect, useState } from "react";
import { getUser } from "../../lib/utils";
import "./User.scss";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const user = getUser();
  const greetings = ["Hello", "Hi", "Hei", "Bonjour", "Namaste"];
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    const index = Math.floor(Math.random() * greetings.length);
    const randomGreeting = `${greetings[index]} ${user.name}`;
    setGreeting(randomGreeting);
  }, []);

  if (user !== null) {
    return <div className="selectedUser">{greeting}</div>;
  } else {
    return <></>;
  }
}
