import { connect } from "react-redux";
import { fetchStreams } from "../../store/actions";
import CardList from "../../components/CardList";

const StreamList = function () {
  return (
    <>
      <CardList status={"STARTED"} title="Upcoming Streams" />
      <CardList status={"STREAMING"} title="Live Streams" />
      <CardList status={"STOPPED"} title="Recorded Streams" />
    </>
  );
};

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams), user: state.auth.user };
};

export default connect(mapStateToProps, { fetchStreams: fetchStreams })(
  StreamList
);
