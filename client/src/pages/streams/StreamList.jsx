import { useState } from "react";
import CardList from "../../components/CardList";

const StreamList = function () {
  const [state, setState] = useState([false, false, false]);
  const setLoaded = (i) => {
    const c = [...state];
    c[i] = true;
    setState(c);
  };
  return (
    <>
      <h2>Will show you list of streams bye</h2>
      <CardList
        status={"STARTED"}
        start={true}
        onload={() => setLoaded(0)}
        title="Upcoming Streams"
      />
      <CardList
        status={"STREAMING"}
        start={state[0]}
        onload={() => setLoaded(1)}
        title="Live Streams"
      />
      <CardList
        status={"STOPPED"}
        start={state[1]}
        onload={() => setLoaded(2)}
        title="Recorded Streams"
      />
    </>
  );
};

export default StreamList;
