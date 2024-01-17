import { useEffect } from "react";
import { getUser } from "../../lib/utils";
import "./User.scss";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  if (user !== null) {
    return <div className="selectedUser">Hello {user.name}</div>;
  } else {
    return <></>;
  }
}
