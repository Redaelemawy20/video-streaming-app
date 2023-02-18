import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, startStream, editStream } from "../../store/actions";
import { renderInput } from "./StreamCreate";
import { Field, reduxForm } from "redux-form";
import { useEffect } from "react";

const StreamEdit = function ({
  fetchStream,
  editStream,
  streams,
  handleSubmit,
  startStream,
}) {
  const { id } = useParams();
  const stream = streams[id];
  useEffect(() => {
    fetchStream(id);
  }, []);
  const submit = (formData) => {
    editStream(id, formData);
  };
  const showStartBtn = () => {
    if (stream.status === "CREATED")
      return (
        <button
          className="my-2 bg-blue-700 text-white p-2 hover:bg-blue-500 rounded-lg"
          onClick={() => startStream(id)}
        >
          Start
        </button>
      );

    return stream.status === "STARTED" && stream.key
      ? "Your stream started now. Please copy the key and don't send it to any one. " +
          stream.key
      : "The stream has been started.";
  };
  if (!stream) return <div>loading...</div>;
  return (
    <div>
      {showStartBtn()}

      <form onSubmit={handleSubmit(submit)}>
        <div className="my-3">
          <label>Title</label>
          <Field name="name" component={renderInput} />
        </div>
        <div>
          <label>Description</label>
          <Field name="description" component={renderInput} />
        </div>
        <div>
          <label></label>
        </div>
        <button
          className="my-2 bg-blue-700 text-white p-2 hover:bg-blue-500 rounded-lg"
          onClick={submit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { streams: state.streams };
};
const formWrapped = reduxForm({ form: "streamEdit" })(StreamEdit);
export default connect(mapStateToProps, {
  fetchStream,
  startStream,
  editStream,
})(formWrapped);
