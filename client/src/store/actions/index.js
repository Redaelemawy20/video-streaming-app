/* All Action Creators  */

import jwtDecode from "jwt-decode";
import {
  SET_USER,
  STREAM_CREATED,
  STREAMS_FETCHED,
  STREAM_FETCHED,
  STREAM_UPDATED,
  STREAM_DELETED,
} from "./actionTypes";
import streams from "../../apis/streams";

export const fetchUser = () => {
  return (dispatch) => {
    const credentials = localStorage.getItem("credentials");
    let user = false;
    if (credentials) {
      user = jwtDecode(credentials);
      if (Date.now() >= user.exp * 1000) {
        return dispatch(logout());
      }
    }
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };
};
/* auth actions */
export const login = (payload) => {
  return async (dispatch) => {
    const response = await streams.post("/auth", payload);
    const token = response.headers.get("x-auth-token");
    localStorage.setItem("credentials", token);

    dispatch({
      type: SET_USER,
      payload: jwtDecode(token),
    });
  };
};
export const logout = () => {
  localStorage.removeItem("credentials");
  return {
    type: SET_USER,
    payload: false,
  };
};

/* streams actions */
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { sub: userId } = getState().auth.user;

    const response = await streams.post("/", { ...formValues, userId });
    dispatch({
      type: STREAM_CREATED,
      payload: response.data,
    });
  };
};
export const fetchStreams = (status = "") => {
  return async (dispatch) => {
    const response = await streams.get(`/?status=${status}`);
    dispatch({
      type: STREAMS_FETCHED,
      payload: response.data,
    });
  };
};
export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/${id}`);
    dispatch({
      type: STREAM_FETCHED,
      payload: response.data,
    });
  };
};
export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.put(`/${id}`, formValues);
    dispatch({
      type: STREAM_UPDATED,
      payload: response.data,
    });
  };
};
export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/${id}`);
    dispatch({
      type: STREAM_DELETED,
    });
  };
};

export const startStream = (id) => {
  return async (dispatch) => {
    const response = await streams.put(`/${id}/start`);
    dispatch({
      type: STREAM_UPDATED,
      payload: response.data,
    });
  };
};
