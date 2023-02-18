import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default () => {
  return (
    <>
      <NavBar />
      <div className="px-2 py-2 min-h-screen bg-gray-100">
        <div className="container flex flex-col mx-auto ">
          <Outlet />
        </div>
      </div>
    </>
  );
};
