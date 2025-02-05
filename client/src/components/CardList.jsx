import { useEffect, useState } from "react";
import api from "../apis/streams";
import StreamCard from "./StreamCard";

const CardList = ({ status, title, onload, start }) => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/query?status=${status}`);
        setStreams(response.data);
        setLoading(false);
        onload();
      } catch (error) {
        setLoading(false);
        onload();
      }
    };
    if (start) fetchStreams();
  }, [start]);
  if (!start) return <div>...</div>;
  const showList = () => {
    if (!streams.length) {
      if (loading) return <h3>loading...</h3>;
      else return <h3 className="lowercase">there is no {title}</h3>;
    }
    return streams.map((stream) => (
      <StreamCard stream={stream} key={stream.id} />
    ));
  };
  return (
    <section className="py-2">
      <h2 className="text-black text-2xl font-medium mb-4">{title}</h2>
      <div className="flex flex-wrap justify-center">{showList()}</div>
    </section>
  );
};

export default CardList;
