import streams from "../apis/stream";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";
import history from "../history";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// Action create for stream creation
export const createStream = formValues => {
  return async (dispatch, getState) => {
    // Asynchronously send a post req to our json-server at /streams
    // Get User Id from Redux store to associate a user with a stream
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });
    // Dispatch action
    dispatch({ type: CREATE_STREAM, payload: response.data });
    // Navigate user back to home page - programmatic navigation
    history.push("/");
  };
};

// Action creator to get all streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// AC to get single stream
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// AC to edit stream
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

// AC to delete - no response
export const deleteStream = id => async dispatch => {
  await streams.delete(`streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
