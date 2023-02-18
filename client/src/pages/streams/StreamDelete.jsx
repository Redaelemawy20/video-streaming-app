import { connect } from "react-redux";
import { fetchStream } from "../../store/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const StreamDelete = ({ streams, fetchStream }) => {
	const { id } = useParams();
	useEffect(() => {
		fetchStream(id);
	}, [])
	return <>Stream Delete - { streams[id] ? streams[id].title : 'loading'}</>
}
const mapStateToProps = (state) => {
	return { streams: state.streams }
}
export default connect(mapStateToProps, { fetchStream })(StreamDelete);