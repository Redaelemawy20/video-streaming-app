import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { login, logout } from "../store/actions";

const GoogleAuth = ({ auth, login, logout }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();
  useEffect(() => {
    window.addEventListener("load", init);
  }, []);

  useEffect(() => {
    showLoginBtn();
  }, [auth, loaded]);

  const init = () => {
    window.google.accounts.id.initialize({
      client_id:
        "236980003827-t42q80ai1qti9801fi1lu9b6gut184vp.apps.googleusercontent.com",
      callback: (response) => {
        login(response);
      },
    });

    setLoaded(true);
  };
  const showLoginBtn = () => {
    if (!auth.user && loaded) {
      window.google.accounts.id.renderButton(ref.current, {
        type: "icon",
        text: "google",
      });
    }
  };
  return (
    <>
      {auth.user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a
          id="google-btn"
          className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          ref={ref}
        ></a>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { login, logout })(GoogleAuth);
