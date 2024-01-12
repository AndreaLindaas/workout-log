import { getUser } from "../../lib/utils";
import "./User.scss";
export default function User() {
  const user = getUser();
  return <div className="selectedUser">Hello {user.name}</div>;
}
