import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "300px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={`/call`} className="nav-link text-white">Call</Link>
        </li>
      </ul>
      <hr />
      <div>
        <a
          target="_blank"
          href="https://github.com/mr2079"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src="https://github.com/mr2079.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mr2079</strong>
        </a>
      </div>
    </div>
  );
}
