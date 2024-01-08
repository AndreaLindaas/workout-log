import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import "./Home.scss";
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
    return users.map((user, i) => {
      return (
        <>
          <div className="users" key={i}>
            {user.name}
          </div>
        </>
      );
    });
  };
  return (
    <>
      <div>{showUsers()}</div>
    </>
  );
}
