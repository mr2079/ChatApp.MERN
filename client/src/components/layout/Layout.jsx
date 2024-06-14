import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <Outlet/>
      </div>
    </div>
    </>
  );
}
