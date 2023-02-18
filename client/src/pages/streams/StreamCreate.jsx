import { reduxForm, Field } from "redux-form";
import { createStream } from "../../store/actions";
import { connect } from "react-redux";

export const renderInput = ({ input }) => {
  return <input {...input} className="form-input w-3/4 block rounded-lg " />;
};
const StreamCreate = function ({ handleSubmit, createStream }) {
  const submit = (formData) => {
    createStream(formData);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="my-3">
        <label>Title</label>
        <Field name="name" component={renderInput} />
      </div>
      <div>
        <label>Description</label>
        <Field name="description" component={renderInput} />
      </div>
      <button className="my-2 bg-blue-700 text-white p-2 hover:bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );
};

const formWrapped = reduxForm({ form: "streamCreate" })(StreamCreate);

export default connect(null, { createStream })(formWrapped);
