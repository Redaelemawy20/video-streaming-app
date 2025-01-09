import { connect } from "react-redux";
import { Link } from "react-router-dom";

const StreamCard = ({ stream, user }) => {
  let renderAdmin = () => {
    if (user && user._id === stream.owner) {
      return (
        <>
          <Link
            to={`/streams/edit/${stream._id}`}
            className="mx-2 p-1 rounded bg-blue-700 text-white hover:bg-blue-500"
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream._id}`}
            className="rounded p-1 bg-red-700 text-white hover:bg-red-800"
          >
            Delete
          </Link>
        </>
      );
    }
    return null;
  };

  const showBadge = () => {
    switch (stream.status) {
      case "STREAMING":
        return (
          <span className="bg-red-500 text-white absolute rounded-sm capitalize py-1 px-2  top-1 right-1">
            live
          </span>
        );
      case "STARTED":
        return (
          <span className="bg-green-500 text-white absolute rounded-sm capitalize py-1 px-2  top-1 right-1">
            upcoming
          </span>
        );
      default:
        return;
    }
  };
  return (
    <div className="w-full md:w-1/3 p-6">
      <div className="bg-purple-700  rounded-lg relative  hover:shadow-2xl shadow-purple-600  transition duration-200 ease-in-out">
        {showBadge()}

        {stream.image && (
          <Link className="group" to={`show/${stream._id}`}>
            <img
              src={`/query/${stream.image}`}
              alt="Stream Cover"
              className="w-full h-40 rounded-lg object-cover"
            />
          </Link>
        )}
        <div className="px-6 py-4">
          <p className="text-white text-sm font-medium mb-1">{stream.name}</p>
          <p className="text-purple-300 text-xs">{stream.description}</p>
        </div>
        <div className="flex items-center mt-1 px-6 py-4">
          <img
            src={stream.owner.picture}
            alt="Stream Owner Avatar"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-white text-sm font-medium mb-1">
              {stream.owner.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth }) => {
  return { user: auth.user };
};
export default connect(mapStateToProps)(StreamCard);
