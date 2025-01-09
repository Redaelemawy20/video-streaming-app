import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../apis/streams";
import flvjs from "flv.js";
const StreamShow = () => {
  const { id } = useParams();
  const [stream, setStream] = useState();
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    const fetchStream = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/stream/${id}`);
        setStream(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchStream();
  }, []);

  useEffect(() => {
    if (!stream) return;

    const videoElement = videoRef.current;
    if (stream.status === "STOPPED") {
      videoElement.src = `/stream/v/${id}`;
      return;
    }
    const flvPlayer = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:3050/v/live/${id}`,
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    return () => {
      flvPlayer.destroy();
    };
  }, [stream]);

  if (loading) return <div>Loading</div>;
  if (!loading && !stream) return <div>stream not found </div>;
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

export default StreamShow;
