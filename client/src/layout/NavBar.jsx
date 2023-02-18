import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { connect } from "react-redux";

const NavBar = ({ user }) => {
  return (
    <nav className="bg-purple-700 text-white p-4 flex items-center justify-between">
      <div className="logo">
        <Link to="/">Your logo</Link>
      </div>
      <div className="flex nav-links items-center">
        <Link
          to="/"
          className="px-4 text-sm font-medium text-purple-300 hover:text-gray-300"
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/mystreams"
              className="px-4 text-sm font-medium text-purple-300 hover:text-gray-300"
            >
              My Streams
            </Link>
            <Link
              to="/new"
              className="px-4 text-sm font-medium text-purple-300 hover:text-gray-300"
            >
              Create Stream
            </Link>
          </>
        )}

        <GoogleAuth />
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return { user: auth.user };
};
export default connect(mapStateToProps)(NavBar);
