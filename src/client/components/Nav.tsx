import { Link } from "react-router-dom";

export default function Nav(){
  return (
    <nav className="flex flex-1 justify-end">
      <ul>
        <li>
          <Link to="/login" className="btn-s">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}