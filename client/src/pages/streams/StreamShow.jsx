import { connect } from "react-redux";
import { fetchStream } from "../../store/actions";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import flvjs from "flv.js";
const StreamShow = ({ fetchStream, streams }) => {
  const { id } = useParams();
  const stream = streams[id];
  const videoRef = useRef();
  useEffect(() => {
    fetchStream(id);
  }, []);
  console.log(streams);
  useEffect(() => {
    if (!stream) return;

    const videoElement = videoRef.current;
    if (stream.status === "STOPPED") {
      videoElement.src = `http://localhost:5000/recorded/${id}`;
      return;
    }
    const flvPlayer = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:5000/live/${id}`,
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    return () => {
      flvPlayer.destroy();
    };
  }, [stream]);

  if (!stream) return <div>Loading</div>;

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-gray-800">
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
            ref={videoRef}
            controls
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-5 py-3">
            <div className="flex items-center">
              <img
                src={stream.owner.picture}
                alt="Stream Owner Avatar"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {stream.owner.name}
                </p>
                {/* <p className="text-purple-300 text-xs">Stream Owner Name</p> */}
              </div>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{stream.name}</p>
              <p className="text-purple-300 text-xs">{stream.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { streams: state.streams };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
