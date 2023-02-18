import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "./store/actions";
import StreamList from "./pages/streams/StreamList";
import StreamCreate from "./pages/streams/StreamCreate";
import StreamEdit from "./pages/streams/StreamEdit";
import StreamDelete from "./pages/streams/StreamDelete";
import DefaultLayout from "./layout/DefaultLayout";
import StreamShow from "./pages/streams/StreamShow";
import MyStreams from "./pages/streams/MyStreams";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<DefaultLayout />}>
        <Route path="/" element={<StreamList />} />
        <Route path="mystreams" element={<MyStreams />} />
        <Route path="new" element={<StreamCreate />} />
        <Route path="show/:id" element={<StreamShow />} />
        <Route path="edit/:id" element={<StreamEdit />} />
        <Route path="delete/:id" element={<StreamDelete />} />
      </Route>
    </>
  )
);
function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default connect(null, { fetchUser: fetchUser })(App);
