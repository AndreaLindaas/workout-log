import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/users/`)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const saveUserAndRedirect = (event) => {
    const user = users.filter((user) => user.id === event.target.dataset.id);

    localStorage.setItem("user", JSON.stringify(user[0]));
    navigate("/dashboard/" + event.target.dataset.id);
  };

  const showUsers = () => {
    return users.map((user) => (
      <div
        key={user.id}
        data-id={user.id}
        onClick={saveUserAndRedirect}
        className="users"
      >
        {user.name}
      </div>
    ));
  };

  return (
    <>
      <div>{showUsers()}</div>
    </>
  );
}
