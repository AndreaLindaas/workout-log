import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import "./Home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/users/`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsers(result);
      });
  }, []);

  const showUsers = () => {
    return users.map((user) => (
      <Link to={`/dashboard/${user.id}/`} key={user.id}>
        <div className="users">{user.name}</div>
      </Link>
    ));
  };

  return (
    <>
      <div>{showUsers()}</div>
    </>
  );
}
