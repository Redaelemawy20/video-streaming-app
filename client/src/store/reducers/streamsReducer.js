import {
  STREAMS_FETCHED,
  STREAM_FETCHED,
  STREAM_CREATED,
  STREAM_DELETED,
  STREAM_UPDATED,
} from "../actions/actionTypes";
import _ from "lodash";

export default function (streams = {}, action) {
  switch (action.type) {
    case STREAMS_FETCHED:
      return { ...streams, ..._.mapKeys(action.payload, "_id") };
    case STREAM_FETCHED:
      return { ...streams, [action.payload._id]: action.payload };
    case STREAM_CREATED:
      return { ...streams, [action.payload._id]: action.payload };
    case STREAM_UPDATED:
      return { ...streams, [action.payload._id]: action.payload };
    case STREAM_DELETED:
      return { ...streams, [action.payload._id]: undefined };
    default:
      return streams;
  }
}
/* 
  1- must return any value

  2- should return a state every time is called and the state based on 
	previous state and action

  3- must not do any side effects (pure) such as calling an api or reading 
	files or calculating dom elements
	
  4- must not mutate the state and return new state based on previous one

 */
